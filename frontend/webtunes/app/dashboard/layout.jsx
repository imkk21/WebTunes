"use client";
import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { FiLogOut, FiLoader, FiMusic, FiTrendingUp, FiUsers } from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }) {
  const { user, spotifyToken, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && !spotifyToken) {
      router.push("/sign-in");
    }
  }, [user, spotifyToken, loading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      router.push("/sign-in");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <FiLoader className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (!user && !spotifyToken) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Toaster position="top-right" reverseOrder={false} />
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Stats Cards */}
          

          {/* Children Content */}
          <div className="animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
}