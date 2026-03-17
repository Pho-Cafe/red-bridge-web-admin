import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";

const routes = [
  {
    href: "/locations",
    label: "Locations",
    description: "Manage physical locations",
  },
  {
    href: "/teamviewer-resources",
    label: "TeamViewer Resources",
    description: "Assign TeamViewer devices to locations",
  },
];

export default function Home() {
  return (
    <PageLayout>
      <ul className="border border-gray-300 divide-y divide-gray-100 max-w-sm">
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
