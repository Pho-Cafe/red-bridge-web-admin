import React from "react";

export function Table({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr>
          {headers.map((h) => (
            <th
              key={h}
              className="text-left border-b border-gray-900 px-2 pb-2 text-xs font-medium uppercase tracking-wider"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
