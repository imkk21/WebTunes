import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    console.error("Authorization code is missing");
    return NextResponse.json({ error: "Authorization code is missing" }, { status: 400 });
  }

  try {
    console.log("Sending code to backend for token exchange...");
    const backendResponse = await fetch("http://localhost:5000/api/auth/callback/spotify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      console.error("Failed to exchange code for tokens:", data.error);
      throw new Error(data.error || "Failed to exchange code for tokens");
    }

    console.log("Tokens received from backend:", data);

    // Redirect to the callback page with the tokens in the URL
    return NextResponse.redirect(
      `http://localhost:3000/auth/spotify/callback?access_token=${data.access_token}&refresh_token=${data.refresh_token}`
    );
  } catch (error) {
    console.error("Error during Spotify callback:", error);
    return NextResponse.json({ error: "Callback failed" }, { status: 500 });
  }
}