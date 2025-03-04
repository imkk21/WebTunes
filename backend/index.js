const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const SpotifyWebApi = require("spotify-web-api-node");
const http = require("http");
const { Server } = require("socket.io");
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Define Mongoose User Schema
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    spotifyId: { type: String, unique: true, sparse: true },
    displayName: String,
    email: { type: String, unique: true },
    profileImage: String,
    accessToken: String,
    refreshToken: String,
    tokenExpiry: Date, // ✅ Store token expiry time
  })
);

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// Spotify Login Route
app.get("/api/auth/spotify/login", (req, res) => {
  const scopes = ["user-read-email", "user-read-private"]; // Add required scopes
  const state = "some-random-state"; // Optional: Add a state parameter for security
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  res.redirect(authorizeURL);
});

// Spotify Authentication Callback
app.post("/api/auth/callback/spotify", async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "Authorization code is missing" });

  try {
    const spotifyApiInstance = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.SPOTIFY_REDIRECT_URI, // Ensure this matches the frontend
    });

    // Exchange code for access & refresh tokens
    const data = await spotifyApiInstance.authorizationCodeGrant(code);
    const { access_token, refresh_token, expires_in } = data.body;
    const tokenExpiry = new Date(Date.now() + expires_in * 1000); // ✅ Expiry timestamp

    spotifyApiInstance.setAccessToken(access_token);
    const userProfile = await spotifyApiInstance.getMe();

    let user = await User.findOne({ email: userProfile.body.email });

    if (user) {
      user.spotifyId = userProfile.body.id;
      user.accessToken = access_token;
      user.refreshToken = refresh_token;
      user.tokenExpiry = tokenExpiry;
      await user.save();
    } else {
      user = await User.create({
        spotifyId: userProfile.body.id,
        displayName: userProfile.body.display_name,
        email: userProfile.body.email,
        profileImage: userProfile.body.images[0]?.url || "",
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenExpiry,
      });
    }

    res.json({ access_token, refresh_token, user });
  } catch (error) {
    console.error("❌ Spotify authentication error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

// Agora Token Generation Endpoint
app.post("/api/agora/token", (req, res) => {
  const { channelName, uid } = req.body;
  if (!channelName || !uid) {
    return res.status(400).json({ error: "Channel name and UID are required" });
  }

  const appID = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );

  res.json({ token, appID });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));