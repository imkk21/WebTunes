"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive";
}

export const Button: React.FC<ButtonProps> = ({ variant = "default", className, ...props }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition";
  const styles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button className={`${baseStyle} ${styles[variant]} ${className}`} {...props} />
  );
};
