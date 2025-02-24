// app/auth/spotify/callback/page.tsx
"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SpotifyCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const access_token = searchParams.get("access_token");
    const refresh_token = searchParams.get("refresh_token");

    if (access_token && refresh_token) {
      // Store tokens in local storage or Firebase
      localStorage.setItem("spotify_access_token", access_token);
      localStorage.setItem("spotify_refresh_token", refresh_token);

      // Redirect to the home page or dashboard
      router.push("/");
    } else {
      console.error("Failed to retrieve tokens");
      router.push("/sign-in");
    }
  }, [searchParams, router]);

  return <div>Loading...</div>;
}