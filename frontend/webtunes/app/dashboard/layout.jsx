"use client";
import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

export default function DashboardLayout({ children }) {
  const { user, spotifyToken, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && !spotifyToken) {
      router.push("/sign-in");
    }
  }, [user, spotifyToken, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  if (!user && !spotifyToken) {
    return null; 
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">WebTunes Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
            >
              <FiLogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
