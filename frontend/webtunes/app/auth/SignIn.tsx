"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleEmailSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/");
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push("/");
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Sign In</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <button
                    onClick={handleEmailSignIn}
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Sign In with Email
                </button>
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full p-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Sign In with Google
                </button>
                <button
                    onClick={handleSpotifySignIn}
                    className="w-full p-2 mt-4 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Sign In with Spotify
                </button>
            </div>
        </div>
    );
}