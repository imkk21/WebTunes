"use client";
import { useEffect } from "react";
import io from "socket.io-client";

export default function Home() {
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <h1>Welcome to WebTunes!</h1>;
}