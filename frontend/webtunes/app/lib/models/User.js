import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firebaseUID: { type: String, unique: true }, // Firebase user ID
  spotifyId: { type: String, unique: true, sparse: true }, // Allow Firebase-only users
  displayName: { type: String },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String },
  accessToken: { type: String }, // Spotify access token
  refreshToken: { type: String }, // Spotify refresh token
  tokenExpiry: { type: Date }, // Token expiration timestamp
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
