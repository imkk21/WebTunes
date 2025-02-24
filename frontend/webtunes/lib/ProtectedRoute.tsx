"use client";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Check Firebase authentication
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // If no Firebase user, check for Spotify tokens
        const access_token = localStorage.getItem("spotify_access_token");
        const refresh_token = localStorage.getItem("spotify_refresh_token");

        if (!access_token || !refresh_token) {
          // If no Spotify tokens, redirect to sign-in page
          router.push("/sign-in");
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <>{children}</>;
}