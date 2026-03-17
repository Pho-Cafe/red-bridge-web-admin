import React from "react";

export function PageLayout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      {title && (
        <h1 className="text-2xl font-bold tracking-tight mb-6">{title}</h1>
      )}
      {children}
    </main>
  );
}
