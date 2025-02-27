"use client";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const access_token = localStorage.getItem("spotify_access_token");

      if (user || access_token) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <>{children}</>;
}
