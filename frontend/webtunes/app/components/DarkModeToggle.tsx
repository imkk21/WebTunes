"use client";

import React, { useState } from "react";

export function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded bg-gray-200 dark:bg-gray-700"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
