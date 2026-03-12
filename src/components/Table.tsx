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
              className="text-left border-b-2 border-gray-300 px-2 py-1 font-medium"
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
