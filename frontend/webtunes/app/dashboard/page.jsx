"use client";
import React from "react";
import { FaPlay } from "react-icons/fa";

const DashboardHome = () => {
  return (
    <div className="flex-1 p-6 text-white bg-gray-900">
      <h1 className="text-3xl font-bold">Welcome Back!</h1>

      <div className="mt-5 bg-gray-800 p-5 rounded-lg flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Now Playing</h2>
          <p className="text-gray-400">Song Name - Artist</p>
        </div>
        <button className="bg-green-500 p-3 rounded-full">
          <FaPlay className="text-white" />
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-3">Your Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Chill Vibes", "Rock Classics", "Workout", "Top 50"].map((playlist, idx) => (
            <div key={idx} className="bg-gray-700 p-4 rounded-lg">
              <p className="font-semibold">{playlist}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-3">Trending Songs</h2>
        <ul className="space-y-2">
          {["Song A - Artist X", "Song B - Artist Y", "Song C - Artist Z"].map((song, idx) => (
            <li key={idx} className="bg-gray-700 p-3 rounded-lg flex justify-between">
              {song}
              <button className="bg-blue-500 p-2 rounded-full">
                <FaPlay className="text-white" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;
