import { getPrtgAssignments } from "@/db/prtg-resources";
import { getPrtgSensors } from "@/lib/prtg-api";
import { getLocations } from "@/db/locations";
import { PrtgResourcesClient } from "./PrtgResourcesClient";

export const dynamic = "force-dynamic";

export default async function PrtgResources() {
  const [assignments, sensors, locations] = await Promise.all([
    getPrtgAssignments(),
    getPrtgSensors(),
    getLocations(),
  ]);

  // Build a reverse lookup: objid (as string) → location ID
  const sensorToLocationId: Record<string, string> = {};
  for (const [locationId, objids] of Object.entries(assignments)) {
    for (const objid of objids) {
      sensorToLocationId[objid] = locationId;
    }
  }

  const masterList = sensors.map((s) => {
    const id = String(s.objid);
    return {
      id,
      name: s.name,
      device: s.device,
      locationId: sensorToLocationId[id] ?? "",
    };
  });

  const locationOptions = locations
    .map((l) => ({ id: l.id, reference: l.reference }))
    .sort((a, b) => a.reference.localeCompare(b.reference));

  return (
    <PrtgResourcesClient initialData={masterList} locations={locationOptions} />
  );
}
