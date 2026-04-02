"use client";

import { useState } from "react";
import { updatePrtgAssignments } from "@/actions/update-prtg-resources";
import { PageLayout } from "@/components/PageLayout";
import { Table } from "@/components/Table";
import { Button } from "@/components/Button";

interface Sensor {
  id: string;
  name: string;
  device: string;
  locationId: string;
}

interface LocationOption {
  id: string;
  reference: string;
}

export function PrtgResourcesClient({
  initialData,
  locations,
}: {
  initialData: Sensor[];
  locations: LocationOption[];
}) {
  const [sensors, setSensors] = useState(
    initialData.sort((a, b) => a.device.localeCompare(b.device) || a.name.localeCompare(b.name)),
  );
  const assignedCount = sensors.filter((s) => s.locationId).length;

  function onLocationChange(id: string, locationId: string) {
    setSensors(sensors.map((s) => (s.id === id ? { ...s, locationId } : s)));
  }

  function onSave() {
    const assignments: Record<string, string[]> = {};
    for (const sensor of sensors) {
      if (sensor.locationId) {
        if (!assignments[sensor.locationId]) {
          assignments[sensor.locationId] = [];
        }
        assignments[sensor.locationId].push(sensor.id);
      }
    }

    updatePrtgAssignments(assignments).then(() => window.alert("Save Successful"));
  }

  return (
    <PageLayout title="PRTG Resources">
      <p className="text-sm text-gray-600 mb-4">
        {sensors.length} sensors &mdash; {assignedCount} assigned
      </p>
      <Table headers={["ID", "Device", "Sensor", "Location"]}>
        {sensors.map(({ id, name, device, locationId }) => (
          <tr key={id} className="border-b border-gray-100">
            <td className="px-3 py-2"><code>{id}</code></td>
            <td className="px-3 py-2">{device}</td>
            <td className="px-3 py-2">{name}</td>
            <td className="px-3 py-2">
              <select
                value={locationId}
                onChange={(e) => onLocationChange(id, e.target.value)}
                className="border border-gray-300 px-1 py-0.5 text-sm"
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
