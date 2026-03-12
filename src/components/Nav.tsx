import Link from "next/link";

const links = [
  { href: "/locations", label: "Locations" },
  { href: "/teamviewer-observe-list", label: "TeamViewer Observe List" },
];

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Admin";

export function Nav() {
  return (
    <nav className="border-b border-gray-200 px-6 py-3">
      <div className="max-w-4xl mx-auto flex gap-6 items-center">
        <Link href="/" className="text-sm font-semibold mr-2">
          {appName}
        </Link>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
