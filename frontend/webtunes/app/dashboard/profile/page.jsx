"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaSignOutAlt, FaEdit } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [spotifyTrack, setSpotifyTrack] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const response = await fetch(`/api/users/${firebaseUser.uid}`);
          if (!response.ok) throw new Error("Failed to fetch user data");
          const userData = await response.json();
          setUser(userData);
          setName(userData.displayName || "");
          setProfilePicture(userData.profilePicture || "");

          // Fetch currently playing track from Spotify
          const spotifyRes = await fetch(`/api/spotify/now-playing/${firebaseUser.uid}`);
          if (spotifyRes.ok) {
            const trackData = await spotifyRes.json();
            setSpotifyTrack(trackData);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleUpdate = async () => {
    try {
      if (!name.trim()) return;
      const response = await fetch(`/api/users/${user.firebaseUID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: name, profilePicture }),
      });
      if (!response.ok) throw new Error("Failed to update profile");
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      {user ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center"
        >
          <div className="relative inline-block">
            <Image
              src={profilePicture || "/default-avatar.png"}
              alt="Profile"
              width={120}
              height={120}
              className="rounded-full border-4 border-green-400"
            />
            <button onClick={() => setEditing(!editing)} className="absolute bottom-2 right-2 bg-green-500 p-2 rounded-full">
              <FaEdit />
            </button>
          </div>
          {editing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-4 p-2 text-center bg-gray-700 rounded w-full"
            />
          ) : (
            <h2 className="mt-4 text-xl font-semibold">{name}</h2>
          )}
          <p className="text-gray-400">{user.email}</p>
          {editing && (
            <button onClick={handleUpdate} className="mt-3 px-4 py-2 bg-blue-500 rounded">Save</button>
          )}
          {spotifyTrack && (
            <div className="mt-4 bg-gray-700 p-3 rounded">
              <p className="text-sm text-gray-300">Now Playing</p>
              <p className="text-lg font-bold">{spotifyTrack.name}</p>
              <p className="text-sm text-gray-400">{spotifyTrack.artist}</p>
            </div>
          )}
          <button onClick={handleLogout} className="mt-4 p-2 bg-red-600 rounded flex items-center justify-center">
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </motion.div>
      ) : (
        <p className="text-red-500">You are not logged in.</p>
      )}
    </div>
  );
}
