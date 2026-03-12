"use client";

import { useState } from "react";
import { updateTeamViewerAssignments } from "@/actions/update-teamviewer-observe-list";
import { PageLayout } from "@/components/PageLayout";
import { Table } from "@/components/Table";
import { Button } from "@/components/Button";

interface Device {
  id: string;
  name: string;
  location: string;
}

export function TeamViewerObserveListClient({
  initialData,
  locations,
}: {
  initialData: Device[];
  locations: string[];
}) {
  const [devices, setDevices] = useState(initialData);
  const assignedCount = devices.filter((d) => d.location).length;

  function onLocationChange(id: string, location: string) {
    setDevices(
      devices.map((d) => (d.id === id ? { ...d, location } : d))
    );
  }

  function onSave() {
    // Build assignments: location → device IDs
    const assignments: Record<string, string[]> = {};
    for (const device of devices) {
      if (device.location) {
        if (!assignments[device.location]) {
          assignments[device.location] = [];
        }
        assignments[device.location].push(device.id);
      }
    }

    updateTeamViewerAssignments(assignments).then(() =>
      window.alert("save finished")
    );
  }

  return (
    <PageLayout title="TeamViewer Observe List">
      <p className="text-sm text-gray-600 mb-4">
        {devices.length} resources &mdash; {assignedCount} assigned
      </p>
      <Table headers={["Name", "Location"]}>
        {devices.map(({ id, name, location }) => (
          <tr key={id} className="border-b border-gray-200">
            <td className="px-2 py-1">{name}</td>
            <td className="px-2 py-1">
              <select
                value={location}
                onChange={(e) => onLocationChange(id, e.target.value)}
                className="border border-gray-300 rounded px-1 py-0.5 text-sm"
              >
                <option value="">—</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
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
