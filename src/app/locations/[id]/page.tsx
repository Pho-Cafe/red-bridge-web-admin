import { getLocation } from "@/db/locations";
import { getTeamViewerAssignments } from "@/db/teamviewer-resources";
import { LocationClient } from "./LocationClient";

export const dynamic = "force-dynamic";

export default async function LocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [location, assignments] = await Promise.all([
    getLocation(id),
    getTeamViewerAssignments(),
  ]);

  if (!location) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <p className="text-sm text-gray-600">Location not found.</p>
      </main>
    );
  }

  const assignedDeviceIds = assignments[id] ?? [];

  return (
    <LocationClient location={location} assignedDeviceIds={assignedDeviceIds} />
  );
}
