"use client";

const MusicPlayer = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h3 className="text-white font-bold mb-4">Now Playing</h3>
      <div className="flex items-center gap-4">
        <img
          src="/song-cover.jpg"
          alt="Song Cover"
          className="w-16 h-16 rounded-lg"
        />
        <div>
          <p className="text-white">Song Title</p>
          <p className="text-gray-400 text-sm">Artist Name</p>
        </div>
      </div>
      <div className="mt-4">
        <input
          type="range"
          min="0"
          max="100"
          className="w-full bg-gray-700 rounded-lg"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;