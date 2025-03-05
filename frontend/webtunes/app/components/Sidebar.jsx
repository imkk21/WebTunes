"use client";
import Link from "next/link";
import { FiHome, FiMusic, FiVideo, FiUser, FiLogOut } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const Sidebar = () => {
  const pathname = usePathname();

  // Check if a link is active
  const isActive = (path) => pathname === path;

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 p-6 flex flex-col shadow-2xl">
      {/* Logo */}
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
        WebTunes
      </h2>

      {/* Navigation Links */}
      <ul className="space-y-2 flex-1">
        {[
          { href: "/dashboard", icon: <FiHome />, label: "Home" },
          { href: "/dashboard/music", icon: <FiMusic />, label: "Music" },
          { href: "/dashboard/videos", icon: <FiVideo />, label: "Videos" },
          { href: "/dashboard/profile", icon: <FiUser />, label: "Profile" },
        ].map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all transform hover:scale-105 ${
                isActive(link.href)
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 p-3 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition-all transform hover:scale-105"
      >
        <span className="text-xl">
          <FiLogOut />
        </span>
        <span className="text-sm font-medium">Logout</span>
      </button>

      {/* Footer */}
      <div className="mt-4 text-gray-400 text-sm text-center">
        © {new Date().getFullYear()} WebTunes
      </div>
    </nav>
  );
};

export default Sidebar;