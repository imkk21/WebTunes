const express = require("express");
const cors = require("cors");
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

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

const rooms = {};

// Agora Token Generation Endpoint
app.post("/api/agora/token", (req, res) => {
  const { channelName, uid } = req.body;
  if (!channelName || !uid) {
    return res.status(400).json({ error: "Channel name and UID are required" });
  }

  const appID = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600; // 1 hour
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

// Socket.IO Logic
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join-room", (roomId, user) => {
    socket.join(roomId);
    if (!rooms[roomId]) {
      rooms[roomId] = { users: {}, track: null, timestamp: 0, isPlaying: false };
    }
    rooms[roomId].users[socket.id] = user;

    console.log(`${user} joined room: ${roomId}`);

    // Send room data + current track info to new user
    socket.emit("track-update", {
      track: rooms[roomId].track,
      timestamp: rooms[roomId].timestamp,
      isPlaying: rooms[roomId].isPlaying,
    });

    io.to(roomId).emit("room-data", rooms[roomId]);
  });

  // Handle play/pause/seek updates
  socket.on("music-control", ({ roomId, action, timestamp }) => {
    if (rooms[roomId]) {
      rooms[roomId].timestamp = timestamp;
      rooms[roomId].isPlaying = action === "play";
      io.to(roomId).emit("music-update", { action, timestamp });
    }
  });

  // Change Track & Sync Playback
  socket.on("change-track", ({ roomId, track }) => {
    if (rooms[roomId]) {
      rooms[roomId].track = track;
      rooms[roomId].timestamp = 0; // Reset timestamp for new track
      rooms[roomId].isPlaying = true;
      io.to(roomId).emit("track-update", {
        track,
        timestamp: 0,
        isPlaying: true,
      });
    }
  });

  socket.on("disconnect", () => {
    for (const roomId in rooms) {
      if (rooms[roomId].users[socket.id]) {
        delete rooms[roomId].users[socket.id];
        io.to(roomId).emit("room-data", rooms[roomId]);
      }
    }
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Spotify Authentication
app.get("/api/auth/spotify/login", (req, res) => {
  const scopes = ["user-read-private", "user-read-email", "user-modify-playback-state"];
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
  res.redirect(authorizeURL);
});

app.post("/api/auth/callback/spotify", async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "Authorization code is missing" });

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;
    res.json({ access_token, refresh_token });
  } catch (error) {
    console.error("Spotify authentication error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));