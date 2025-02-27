"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [roomCode, setRoomCode] = useState("");
  const [newRoomId, setNewRoomId] = useState("");
  const router = useRouter();

  const createRoom = () => {
    if (newRoomId.trim()) {
      router.push(`/dashboard/room/${newRoomId}`);
    } else {
      alert("Please enter a room ID."); 
    }
  };

  const joinRoom = () => {
    if (roomCode.trim()) {
      router.push(`/dashboard/room/${roomCode}`);
    } else {
      alert("Please enter a room code.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Welcome to WebTunes</h2>
      <p className="mt-2 text-gray-300">Select an option from the sidebar.</p>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={newRoomId}
            onChange={(e) => setNewRoomId(e.target.value)}
            className="p-2 border border-gray-400 rounded w-full"
          />
          <button 
            onClick={createRoom} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Create Room
          </button>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="p-2 border border-gray-400 rounded w-full"
          />
          <button 
            onClick={joinRoom} 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}