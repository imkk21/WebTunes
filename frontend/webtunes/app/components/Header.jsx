"use client";
import { FiBell, FiSearch } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

const Header = () => {
  const { user } = useAuth(); // Get the logged-in user from your AuthContext

  return (
    <header className="bg-gray-900/80 backdrop-blur-lg p-4 flex justify-between items-center border-b border-gray-800/50 shadow-lg">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-800/50 rounded-lg px-4 py-2 transition-all duration-300 hover:bg-gray-800/70">
        <FiSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent ml-2 text-white focus:outline-none placeholder-gray-400"
        />
      </div>

      {/* Notifications and User Info */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-all duration-300 transform hover:scale-110">
          <FiBell className="text-gray-400 hover:text-white" />
        </button>

        {/* User Profile */}
        {user && (
          <div className="flex items-center gap-2">
            {/* Profile Picture */}
            {user.photoURL && (
              <div className="flex items-center gap-2">
                <Image
                  src={user.photoURL}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-purple-500/50 hover:border-purple-500 transition-all duration-300"
                />
              </div>
            )}

            {/* User Name */}
            <span className="text-white font-medium">
              {user.displayName || user.email}
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;