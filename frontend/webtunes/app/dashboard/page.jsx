"use client";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    playlists: 8, // Number of playlists
    songs: 120, // Number of songs
    watchParties: 3, // Number of watch parties
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Send user data to MongoDB backend
        try {
          const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firebaseUID: firebaseUser.uid,
              displayName: firebaseUser.displayName,
              email: firebaseUser.email,
              profilePicture: firebaseUser.photoURL,
            }),
          });

          const data = await res.json();
          console.log("User saved:", data);
        } catch (error) {
          console.error("Error saving user:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="min-h-screen p-6">
      {user ? (
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, {user.displayName}
            </h1>
            <p className="text-gray-600 mt-2">Ready to vibe with WebTunes?</p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-bold text-blue-600">Playlists</h2>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {stats.playlists}
              </p>
              <p className="text-gray-600">Your Playlists</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-bold text-green-600">Songs</h2>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {stats.songs}
              </p>
              <p className="text-gray-600">Total Songs</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-bold text-purple-600">Watch Parties</h2>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {stats.watchParties}
              </p>
              <p className="text-gray-600">Active Watch Parties</p>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 hover:bg-gray-200 rounded-lg transition-colors">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-gray-600">You created a new playlist.</p>
              </div>
              <div className="flex items-center space-x-4 p-4 hover:bg-gray-200 rounded-lg transition-colors">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-gray-600">
                  Added 5 new songs to your library.
                </p>
              </div>
              <div className="flex items-center space-x-4 p-4 hover:bg-gray-200 rounded-lg transition-colors">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <p className="text-gray-600">Hosted a watch party for "Album Release".</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="bg-gray-100 p-8 rounded-lg shadow-md text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to WebTunes
            </h1>
            <p className="text-gray-600 mb-6">
              Please sign in to access your dashboard.
            </p>
            <button
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={handleLogin}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
}