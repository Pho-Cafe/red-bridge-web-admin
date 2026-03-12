"use client";

import { useState } from "react";
import { updateTeamViewerAssignments } from "@/actions/update-teamviewer-resources";
import { PageLayout } from "@/components/PageLayout";
import { Table } from "@/components/Table";
import { Button } from "@/components/Button";

interface Device {
  id: string;
  name: string;
  locationId: string;
}

interface LocationOption {
  id: string;
  reference: string;
}

export function TeamViewerResourcesClient({
  initialData,
  locations,
}: {
  initialData: Device[];
  locations: LocationOption[];
}) {
  const [devices, setDevices] = useState(initialData);
  const assignedCount = devices.filter((d) => d.locationId).length;

  function onLocationChange(id: string, locationId: string) {
    setDevices(
      devices.map((d) => (d.id === id ? { ...d, locationId } : d))
    );
  }

  function onSave() {
    // Build assignments: location ID → device IDs
    const assignments: Record<string, string[]> = {};
    for (const device of devices) {
      if (device.locationId) {
        if (!assignments[device.locationId]) {
          assignments[device.locationId] = [];
        }
        assignments[device.locationId].push(device.id);
      }
    }

    updateTeamViewerAssignments(assignments).then(() =>
      window.alert("save finished")
    );
  }

  return (
    <PageLayout title="TeamViewer Resources">
      <p className="text-sm text-gray-600 mb-4">
        {devices.length} resources &mdash; {assignedCount} assigned
      </p>
      <Table headers={["Name", "Location"]}>
        {devices.map(({ id, name, locationId }) => (
          <tr key={id} className="border-b border-gray-200">
            <td className="px-2 py-1">{name}</td>
            <td className="px-2 py-1">
              <select
                value={locationId}
                onChange={(e) => onLocationChange(id, e.target.value)}
                className="border border-gray-300 rounded px-1 py-0.5 text-sm"
              >
                <option value="">—</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.reference}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </Table>
      <div className="mt-4">
        <Button onClick={onSave}>Save</Button>
      </div>
    </PageLayout>
  );
}
