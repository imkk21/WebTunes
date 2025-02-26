"use client";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function MusicPage() {
  const { spotifyToken } = useAuth();
  const router = useRouter();

  const handleConnectSpotify = () => {
    const clientId = "2067f81d796f465b89d6076b5ea65143";
    const redirectUri = "http://localhost:3000/api/auth/callback/spotify"; // Change this to your actual redirect URL
    const scope = "user-read-email user-read-private streaming";
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}`;

    router.push(authUrl);
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold">Music</h2>
      <p className="mt-2 text-gray-300">Explore your music collection here.</p>

      {/* Spotify Player */}
      {spotifyToken ? (
        <div className="mt-6">
          <iframe
            src={`https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator`}
            width="100%"
            height="380"
            allow="encrypted-media"
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-red-400 mb-4">Connect your Spotify account to listen to music.</p>
          <button
            onClick={handleConnectSpotify}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition"
          >
            Connect to Spotify
          </button>
        </div>
      )}
    </div>
  );
}
