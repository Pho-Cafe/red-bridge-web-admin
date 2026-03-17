import React from "react";

export function Button({
  children,
  onClick,
  type = "button",
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="border border-gray-400 bg-gray-100 px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-200 disabled:opacity-40 disabled:cursor-default disabled:hover:bg-gray-100"
    >
      {children}
    </button>
  );
}
