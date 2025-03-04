"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function MusicPage() {
  const { user, spotifyToken, saveSpotifyToken } = useAuth();
  const router = useRouter();
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  // Handle Spotify token from URL query
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("spotify_token");

    if (token) {
      saveSpotifyToken(token);
      router.replace("/dashboard/music"); // Remove the token from the URL
    }
  }, [saveSpotifyToken, router]);

  // Fetch playlists if Spotify token is available
  useEffect(() => {
    if (spotifyToken) {
      fetch("https://api.spotify.com/v1/me/playlists", {
        headers: { Authorization: `Bearer ${spotifyToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.items) {
            setPlaylists(data.items.map((item) => ({ id: item.id, name: item.name })));
          }
        })
        .catch((err) => console.error("Error fetching playlists:", err));
    }
  }, [spotifyToken]);

  // Redirect to Spotify login
  const signInWithSpotify = () => {
    window.location.href = "http://localhost:5000/api/auth/spotify/login";
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold">Music</h2>
      <p className="mt-2 text-gray-300">Explore your music collection here.</p>

      {user ? (
        spotifyToken ? (
          <div className="mt-6">
            {playlists.length > 0 ? (
              <>
                <label className="text-gray-300">Select a Playlist:</label>
                <select
                  onChange={(e) => setSelectedPlaylist(e.target.value)}
                  className="block w-full mt-2 p-2 bg-gray-800 text-white rounded-md"
                >
                  <option value="">-- Choose a playlist --</option>
                  {playlists.map((playlist) => (
                    <option key={playlist.id} value={playlist.id}>
                      {playlist.name}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <p className="text-gray-400">No playlists found.</p>
            )}

            {selectedPlaylist && (
              <iframe
                src={`https://open.spotify.com/embed/playlist/${selectedPlaylist}`}
                width="100%"
                height="380"
                allow="encrypted-media"
                className="mt-4 rounded-lg shadow-lg"
              ></iframe>
            )}
          </div>
        ) : (
          <div className="mt-6">
            <p className="text-gray-400 mb-4">You are logged in with Google. Connect your Spotify account to listen to music.</p>
            <button
              onClick={signInWithSpotify}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition"
            >
              Connect to Spotify
            </button>
          </div>
        )
      ) : (
        <div className="mt-6">
          <p className="text-red-400 mb-4">Please log in with Google to access this feature.</p>
        </div>
      )}
    </div>
  );
}