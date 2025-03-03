"use client";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import Image from "next/image";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Send user data to MongoDB backend
        try {
          const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firebaseUID: firebaseUser.uid, // Match the backend model field
              displayName: firebaseUser.displayName,
              email: firebaseUser.email,
              profilePicture: firebaseUser.photoURL,
            }),
          });

          const data = await res.json();
          console.log("User saved:", data);
        } catch (error) {
          console.error("Error saving user:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="p-6">
      {user ? (
        <>
          <h1 className="text-2xl font-bold">Welcome, {user.displayName}</h1>
          <Image src={user.photoURL} alt="Profile" width={100} height={100} className="rounded-full" />
          <p>Email: {user.email}</p>
          <button className="mt-4 p-2 bg-red-500 text-white" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <button className="p-2 bg-blue-500 text-white" onClick={handleLogin}>
          Sign in with Google
        </button>
      )}
    </div>
  );
}
