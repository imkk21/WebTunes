import React from "react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-lg text-white">
      <h2 className="text-2xl font-bold">Discover New Music & Videos</h2>
      <p className="mt-2">Explore the latest hits and trending videos.</p>
      <button className="mt-4 px-6 py-2 bg-white text-black rounded-lg hover:opacity-80 transition">
        Explore Now
      </button>
    </div>
  );
};

export default Hero;
