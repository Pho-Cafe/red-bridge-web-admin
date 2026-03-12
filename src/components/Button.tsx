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
      className="border border-gray-900 px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-900 hover:text-white disabled:opacity-40 disabled:cursor-default disabled:hover:bg-transparent disabled:hover:text-inherit"
    >
      {children}
    </button>
  );
}
