"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

interface Message {
  id: string;
  text: string;
  user: string;
  createdAt?: string;
}

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const { user } = useAuth();
  const { roomId } = params;
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!roomId) return;

    const messagesRef = collection(db, "rooms", roomId, "messages");
    const q = query(messagesRef, orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Message)));
    });

    return () => unsubscribe();
  }, [roomId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    await addDoc(collection(db, "rooms", roomId, "messages"), {
      text: newMessage,
      user: user?.displayName || user?.email || "Anonymous",
      createdAt: serverTimestamp(),
    });

    setNewMessage("");
  };

  const exitRoom = () => {
    router.push("/dashboard"); // Redirect to home or dashboard
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center">Room: {roomId}</h2>
      <button
        onClick={exitRoom}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Exit Room
      </button>
      <div className="mt-4 p-4 border rounded bg-gray-800 text-white">
        <h3 className="text-lg font-bold">Chat</h3>
        <div className="h-60 overflow-y-auto bg-gray-700 p-2 rounded mt-2">
          {messages.map((msg) => (
            <p key={msg.id} className="p-1">
              <span className="font-bold">{msg.user}: </span>
              {msg.text}
            </p>
          ))}
        </div>
        <div className="mt-2 flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}