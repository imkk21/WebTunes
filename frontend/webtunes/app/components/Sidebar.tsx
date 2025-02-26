import React from "react";
import { FiHome, FiMusic, FiVideo, FiUser } from "react-icons/fi";
import Link from "next/link";

const Sidebar = () => {
  return (
    <nav className="w-64 bg-gray-800 h-screen p-6 flex flex-col">
      <h2 className="text-xl font-bold text-white">WebTunes</h2>
      <ul className="mt-6 space-y-4">
        <li>
          <Link href="/dashboard" className="flex items-center text-white gap-3 hover:text-gray-300">
            <FiHome /> Home
          </Link>
        </li>
        <li>
          <Link href="/dashboard/music" className="flex items-center text-white gap-3 hover:text-gray-300">
            <FiMusic /> Music
          </Link>
        </li>
        <li>
          <Link href="/dashboard/videos" className="flex items-center text-white gap-3 hover:text-gray-300">
            <FiVideo /> Videos
          </Link>
        </li>
        <li>
          <Link href="/dashboard/profile" className="flex items-center text-white gap-3 hover:text-gray-300">
            <FiUser /> Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
