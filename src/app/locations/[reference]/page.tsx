import { getLocation } from "@/db/locations";
import { LocationClient } from "./LocationClient";

export const dynamic = "force-dynamic";

export default async function LocationPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  const location = await getLocation(decodeURIComponent(reference));

  if (!location) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <p className="text-sm text-gray-600">
          Location &quot;{decodeURIComponent(reference)}&quot; not found.
        </p>
      </main>
    );
  }

  return <LocationClient location={location} />;
}
