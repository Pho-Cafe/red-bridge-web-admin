import React from "react";

export function PageLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold tracking-tight mb-1">{title}</h1>
      <hr className="border-gray-200 mb-6" />
      {children}
    </main>
  );
}
