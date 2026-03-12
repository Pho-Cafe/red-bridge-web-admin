import { getTeamViewerAssignments } from "@/db/teamviewer-observe-list";
import { getTeamViewerManagedDeviceList } from "@/lib/teamviewer-api";
import { getLocations } from "@/db/locations";
import { TeamViewerObserveListClient } from "./TeamViewerObserveListClient";

export const dynamic = "force-dynamic"; // skip build-time generation

export default async function TeamViewerObserveList() {
  const [assignments, { resources: managedDeviceList }, locations] =
    await Promise.all([
      getTeamViewerAssignments(),
      getTeamViewerManagedDeviceList(),
      getLocations(),
    ]);

  // Build a reverse lookup: device ID → location reference
  const deviceToLocation: Record<string, string> = {};
  for (const [locationRef, deviceIds] of Object.entries(assignments)) {
    for (const deviceId of deviceIds) {
      deviceToLocation[deviceId] = locationRef;
    }
  }

  const masterList = managedDeviceList.map((md: any) => ({
    id: md.id,
    name: md.name,
    location: deviceToLocation[md.id] ?? "",
  }));

  const locationRefs = locations.map((l) => l.reference).sort();

  return (
    <TeamViewerObserveListClient
      initialData={masterList}
      locations={locationRefs}
    />
  );
}
