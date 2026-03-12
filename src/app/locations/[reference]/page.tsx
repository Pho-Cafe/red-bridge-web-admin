import { getLocation } from "@/db/locations";
import { getTeamViewerAssignments } from "@/db/teamviewer-observe-list";
import { LocationClient } from "./LocationClient";

export const dynamic = "force-dynamic";

export default async function LocationPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  const decodedRef = decodeURIComponent(reference);
  const [location, assignments] = await Promise.all([
    getLocation(decodedRef),
    getTeamViewerAssignments(),
  ]);

  if (!location) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <p className="text-sm text-gray-600">
          Location &quot;{decodedRef}&quot; not found.
        </p>
      </main>
    );
  }

  const assignedDeviceIds = assignments[decodedRef] ?? [];

  return (
    <LocationClient location={location} assignedDeviceIds={assignedDeviceIds} />
  );
}
