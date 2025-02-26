"use client";
import React from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { DarkModeToggle } from "../components/DarkModeToggle";
import { FiLogOut } from "react-icons/fi";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, spotifyToken, loading, logout } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  if (!user && !spotifyToken) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">WebTunes Dashboard</h1>
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
            >
              <FiLogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* This will load nested pages (dashboard/music, dashboard/videos, etc.) */}
        {children}
      </main>
    </div>
  );
}
