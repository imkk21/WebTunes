"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load initial state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("spotify_access_token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setSpotifyToken(storedToken);
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        localStorage.setItem("user", JSON.stringify(firebaseUser));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Handle Spotify OAuth flow
  const signInWithSpotify = () => {
    const clientId = "2067f81d796f465b89d6076b5ea65143"; // Replace with your Spotify Client ID
    const redirectUri = "http://localhost:3000/api/auth/callback/spotify"; // Updated to match backend
    const scope = "user-read-email user-read-private streaming playlist-read-private";

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}`;

    // Redirect to Spotify authorization page
    window.location.href = authUrl;
  };

  // Save Spotify token
  const saveSpotifyToken = async (token) => {
    try {
      // Save the token to localStorage
      localStorage.setItem("spotify_access_token", token);
      setSpotifyToken(token);

      // Save the token to your backend (e.g., Firebase or your database)
      if (user) {
        await fetch(`/api/users/${user.uid}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ spotifyToken: token }),
        });
      }
    } catch (error) {
      console.error("Error saving Spotify token:", error);
    }
  };

  // Handle logout
  const logout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      localStorage.removeItem("spotify_access_token");
      localStorage.removeItem("spotify_refresh_token");
      localStorage.removeItem("user");
      setUser(null);
      setSpotifyToken(null);
      router.push("/sign-in");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        spotifyToken,
        loading,
        signInWithSpotify,
        saveSpotifyToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};