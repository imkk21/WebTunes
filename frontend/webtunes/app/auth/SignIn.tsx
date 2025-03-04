"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { FaGoogle,  FaEnvelope , FaSpotify,} from "react-icons/fa";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSpotifySignIn = async () => {
    try {
      window.location.href = "http://localhost:5000/api/auth/spotify/login";
    } catch (error) {
      console.error("Error signing in with Spotify:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Sign In to WebTunes</h1>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400"
          />
        </div>


        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          onClick={handleEmailSignIn}
          className="w-full p-3 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition duration-300 mb-4"
        >
          <FaEnvelope className="mr-2" /> Sign In with Email
        </button>

        <button
          onClick={handleGoogleSignIn}
          className="w-full p-3 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition duration-300 mb-4"
        >
          <FaGoogle className="mr-2" /> Sign In with Google
        </button>

        <button
          onClick={handleSpotifySignIn}
          className="w-full p-3 flex items-center justify-center bg-green-700 hover:bg-green-800 text-white font-bold rounded-lg transition duration-300"
        >
          <FaSpotify className="mr-2" /> Sign In with Spotify
        </button>
      </div>
    </div>
  );
}
