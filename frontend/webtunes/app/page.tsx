"use client";
import React from "react";
import ProtectedRoute from "../lib/ProtectedRoute";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleExplore = () => {
    router.push("/sign-in"); // Redirects to sign-in page instead of /music
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6">
        {/* Hero Section */}
        <header className="text-center">
          <h1 className="text-5xl font-bold text-green-400">Welcome to WebTunes</h1>
          <p className="mt-4 text-lg text-gray-300">
            Stream music, watch together, and vibe in real time.
          </p>
        </header>

        {/* Features Section */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          <FeatureCard
            title="🎵 Music Streaming"
            description="Enjoy seamless music playback with your favorite playlists."
          />
          <FeatureCard
            title="🎥 Watch Together"
            description="Sync with friends and watch music videos in real time."
          />
          <FeatureCard
            title="🔗 Share & Connect"
            description="Invite friends and create rooms for shared experiences."
          />
        </section>

        {/* Get Started Section */}
        <div className="mt-10">
          <button
            onClick={handleExplore}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg text-lg transition"
          >
            Start Listening & Watching
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}

// Feature Card Component
function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold text-green-400">{title}</h2>
      <p className="mt-2 text-gray-300">{description}</p>
    </div>
  );
}
