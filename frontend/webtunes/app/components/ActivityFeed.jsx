"use client";
import { FiMusic, FiVideo, FiUser } from "react-icons/fi";

const ActivityFeed = () => {
  const activities = [
    { id: 1, icon: <FiMusic />, text: "You added a new song", time: "2 hours ago" },
    { id: 2, icon: <FiVideo />, text: "New video uploaded", time: "5 hours ago" },
    { id: 3, icon: <FiUser />, text: "Profile updated", time: "1 day ago" },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h3 className="text-white font-bold mb-4">Recent Activity</h3>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-center gap-4">
            <div className="p-2 bg-gray-700 rounded-full">{activity.icon}</div>
            <div>
              <p className="text-white">{activity.text}</p>
              <p className="text-gray-400 text-sm">{activity.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;