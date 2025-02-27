"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User, signOut } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  spotifyToken: string | null;
  loading: boolean;
  signInWithSpotify: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [spotifyToken, setSpotifyToken] = useState<string | null>(null);
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
    const clientId = "2067f81d796f465b89d6076b5ea65143";
    const redirectUri = "http://localhost:3000/auth/callback";
    const scope = "user-read-email user-read-private streaming";

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}`;

    // Redirect to Spotify authorization page
    window.location.href = authUrl;
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
    <AuthContext.Provider value={{ user, spotifyToken, loading, signInWithSpotify, logout }}>
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