"use client";
import Link from "next/link";
import { FiHome, FiMusic, FiVideo, FiUser, FiLogOut } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { auth } from "@/lib/firebase"; // Import Firebase auth
import { signOut } from "firebase/auth"; // Import signOut function

const Sidebar = () => {
  const pathname = usePathname();

  // Check if a link is active
  const isActive = (path) => pathname === path;

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-64 h-screen bg-gray-800 border-r border-gray-700 p-6 flex flex-col">
      {/* Logo */}
      <h2 className="text-xl font-bold text-white mb-8">WebTunes</h2>

      {/* Navigation Links */}
      <ul className="space-y-2">
        {[
          { href: "/dashboard", icon: <FiHome />, label: "Home" },
          { href: "/dashboard/music", icon: <FiMusic />, label: "Music" },
          { href: "/dashboard/videos", icon: <FiVideo />, label: "Videos" },
          { href: "/dashboard/profile", icon: <FiUser />, label: "Profile" },
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

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 p-3 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition-all"
      >
        <FiLogOut />
        <span>Logout</span>
      </button>

      {/* Footer (Optional) */}
      <div className="mt-4 text-gray-400 text-sm">
        © {new Date().getFullYear()} WebTunes
      </div>
    </nav>
  );
};

export default Sidebar;