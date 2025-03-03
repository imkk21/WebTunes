"use client";
import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { FiLogOut, FiLoader } from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
  }, [user, loading, router]);

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

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Toaster position="top-right" reverseOrder={false} />
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64"> {/* Adjust margin to match Sidebar width */}
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
          </main>

          {/* Footer */}
            <Footer />
         
      
      </div>
    </div>
  );
}