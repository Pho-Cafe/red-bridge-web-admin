import React from "react";

export function PageLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">{title}</h1>
      {children}
    </main>
  );
}
