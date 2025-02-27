"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

interface Playlist {
  id: string;
  name: string;
}

export default function MusicPage() {
  const { user, spotifyToken } = useAuth(); // Assuming `user` contains Google auth info
  const router = useRouter();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");

  const handleConnectSpotify = () => {
    const clientId = "2067f81d796f465b89d6076b5ea65143"; // Replace with your Spotify client ID
    const redirectUri = "http://localhost:3000/api/auth/callback/spotify"; // Your callback URL
    const scope = "user-read-email user-read-private streaming playlist-read-private";
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}`;
  
    router.push(authUrl);
  };

  useEffect(() => {
    if (spotifyToken) {
      fetch("https://api.spotify.com/v1/me/playlists", {
        headers: { Authorization: `Bearer ${spotifyToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.items) {
            setPlaylists(data.items.map((item: { id: string; name: string }) => ({ id: item.id, name: item.name })));
          }
        })
        .catch((err) => console.error("Error fetching playlists:", err));
    }
  }, [spotifyToken]);

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold">Music</h2>
      <p className="mt-2 text-gray-300">Explore your music collection here.</p>

      {user ? ( // Check if the user is authenticated via Google
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
              onClick={handleConnectSpotify}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition"
            >
              Connect to Spotify
            </button>
          </div>
        )
      ) : (
        <div className="mt-6">
          <p className="text-red-400 mb-4">Please log in with Google to access this feature.</p>
          {/* Add a button or link to log in with Google */}
        </div>
      )}
    </div>
  );
}