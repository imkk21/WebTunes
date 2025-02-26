"use client";

import React from "react";

interface AnalyticsCardProps {
  title: string;
  value: string;
  change: string;
}

export function AnalyticsCard({ title, value, change }: AnalyticsCardProps) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-sm text-green-500">{change}</p>
    </div>
  );
}
