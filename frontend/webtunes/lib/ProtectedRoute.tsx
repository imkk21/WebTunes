"use client";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        const access_token = localStorage.getItem("spotify_access_token");
        if (!access_token) {
          router.push("/sign-in");
        } else {
          router.push("/dashboard");
        }
      } else {
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <>{children}</>;
}
