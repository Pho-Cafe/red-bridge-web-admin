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
      className="border border-gray-400 bg-gray-100 px-3 py-1 cursor-pointer text-sm disabled:opacity-50 disabled:cursor-default"
    >
      {children}
    </button>
  );
}
