"use client";
import { FiBell, FiSearch } from "react-icons/fi";

const Header = () => {
  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-700 rounded-lg px-4 py-2">
        <FiSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent ml-2 text-white focus:outline-none"
        />
      </div>

      {/* Notifications and User Info */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-700 rounded-lg">
          <FiBell className="text-gray-400" />
        </button>
        <div className="flex items-center gap-2">
          <img
            src="/profile-pic.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-white">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;