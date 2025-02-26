"use client";

import React from "react";

export function RecentActivity() {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-bold">Recent Activity</h3>
      <ul className="mt-2 space-y-2">
        <li>User John uploaded a file.</li>
        <li>Admin updated settings.</li>
      </ul>
    </div>
  );
}
