"use client"; // Mark this as a Client Component
import React from "react";
import { FiHome, FiMusic, FiVideo, FiUser, FiSettings } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  // Check if a link is active
  const isActive = (path) => pathname === path;

  return (
    <nav className="w-64 bg-gray-800 h-screen p-6 flex flex-col border-r border-gray-700">
      {/* Logo */}
      <h2 className="text-xl font-bold text-white mb-8">WebTunes</h2>

      {/* Navigation Links */}
      <ul className="space-y-2">
        {[
          { href: "/dashboard", icon: <FiHome />, label: "Home" },
          { href: "/dashboard/music", icon: <FiMusic />, label: "Music" },
          { href: "/dashboard/videos", icon: <FiVideo />, label: "Videos" },
          { href: "/dashboard/profile", icon: <FiUser />, label: "Profile" },
          { href: "/dashboard/settings", icon: <FiSettings />, label: "Settings" },
        ].map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                isActive(link.href)
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer (Optional) */}
      <div className="mt-auto text-gray-400 text-sm">
        © {new Date().getFullYear()} WebTunes
      </div>
    </nav>
  );
};

export default Sidebar;