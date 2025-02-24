const express = require("express");
const cors = require("cors");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Spotify Web API
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// Redirect user to Spotify login page
app.get("/api/auth/spotify/login", (req, res) => {
  const scopes = ["user-read-private", "user-read-email", "user-modify-playback-state"];
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
  res.redirect(authorizeURL);
});

// Callback after Spotify authentication
app.get("/api/auth/spotify/callback", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Authorization code is missing" });
  }

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;

    // Send tokens back to the frontend
    res.json({ access_token, refresh_token });
  } catch (error) {
    console.error("Error during Spotify authentication:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});