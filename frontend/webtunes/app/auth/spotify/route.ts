import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Authorization code is missing" }, { status: 400 });
  }

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code: code,
          redirect_uri: "http://localhost:3000/auth/spotify/callback", // Must match the redirect URI used in the authorization request
          client_id: "2067f81d796f465b89d6076b5ea65143", // Replace with your Spotify client ID
          client_secret: "YOUR_SPOTIFY_CLIENT_SECRET", // Replace with your Spotify client secret
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token } = response.data;

    // Redirect to the callback page with the tokens in the URL
    return NextResponse.redirect(
      `http://localhost:3000/auth/spotify/callback?access_token=${access_token}&refresh_token=${refresh_token}`
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error exchanging code for token:", error.message);
      return NextResponse.json({ error: "Failed to authenticate with Spotify" }, { status: 500 });
    } else {
      console.error("An unknown error occurred:", error);
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}