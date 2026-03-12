import { getTeamViewerAssignments } from "@/db/teamviewer-resources";
import { getTeamViewerManagedDeviceList } from "@/lib/teamviewer-api";
import { getLocations } from "@/db/locations";
import { TeamViewerResourcesClient } from "./TeamViewerResourcesClient";

export const dynamic = "force-dynamic"; // skip build-time generation

export default async function TeamViewerResources() {
  const [assignments, { resources: managedDeviceList }, locations] =
    await Promise.all([
      getTeamViewerAssignments(),
      getTeamViewerManagedDeviceList(),
      getLocations(),
    ]);

  // Build a reverse lookup: device ID → location ID
  const deviceToLocationId: Record<string, string> = {};
  for (const [locationId, deviceIds] of Object.entries(assignments)) {
    for (const deviceId of deviceIds) {
      deviceToLocationId[deviceId] = locationId;
    }
  }

  const masterList = managedDeviceList.map((md: any) => ({
    id: md.id,
    name: md.name,
    locationId: deviceToLocationId[md.id] ?? "",
  }));

  const locationOptions = locations
    .map((l) => ({ id: l.id, reference: l.reference }))
    .sort((a, b) => a.reference.localeCompare(b.reference));

  return (
    <TeamViewerResourcesClient
      initialData={masterList}
      locations={locationOptions}
    />
  );
}
