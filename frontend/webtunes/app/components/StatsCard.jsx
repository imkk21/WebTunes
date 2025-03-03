"use client";
import { FiMusic, FiTrendingUp, FiUsers } from "react-icons/fi";

const StatsCard = ({ icon, title, value, trend }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-700 rounded-full">{icon}</div>
        <div>
          <h3 className="text-gray-400 text-sm">{title}</h3>
          <p className="text-white text-2xl font-bold">{value}</p>
        </div>
      </div>
      {trend && (
        <p className="text-sm mt-2">
          <span className={trend.color}>{trend.value}</span> {trend.label}
        </p>
      )}
    </div>
  );
};

// Usage
<StatsCard
  icon={<FiMusic />}
  title="Total Songs"
  value="1,234"
  trend={{ value: "+12%", label: "this month", color: "text-green-500" }}
/>;

export default StatsCard;