import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";

const routes = [
  {
    href: "/locations",
    label: "Locations",
    description: "Manage physical locations",
  },
  {
    href: "/teamviewer-observe-list",
    label: "TeamViewer Observe List",
    description: "Configure observed TeamViewer devices",
  },
];

export default function Home() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Admin";
  return (
    <PageLayout title={appName}>
      <ul className="border border-gray-200 divide-y divide-gray-200 max-w-sm">
        {routes.map(({ href, label, description }) => (
          <li key={href}>
            <Link href={href} className="flex flex-col gap-0.5 px-4 py-3 hover:bg-gray-50">
              <span className="text-sm font-medium">{label}</span>
              <span className="text-xs text-gray-400">{description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
