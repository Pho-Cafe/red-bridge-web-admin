"use client";

import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Table } from "@/components/Table";
import { updateLocationAction } from "@/actions/update-location";
import type { Location } from "@/db/locations";

function parseCoordinate(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const n = parseFloat(trimmed);
  return isNaN(n) ? null : n;
}

export function LocationClient({
  location,
  assignedDeviceIds,
}: {
  location: Location;
  assignedDeviceIds: string[];
}) {
  const [reference, setReference] = useState(location.reference);
  const [longitude, setLongitude] = useState(
    location.longitude !== null ? String(location.longitude) : ""
  );
  const [latitude, setLatitude] = useState(
    location.latitude !== null ? String(location.latitude) : ""
  );
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!reference.trim()) return;
    setSaving(true);
    await updateLocationAction(location.id, {
      reference: reference.trim(),
      longitude: parseCoordinate(longitude),
      latitude: parseCoordinate(latitude),
    });
  }

  return (
    <PageLayout title={`Location: ${location.reference}`}>
      <div className="flex flex-col gap-4 max-w-sm">
        <Input
          label="Reference"
          id="reference"
          value={reference}
          onChange={setReference}
          required
        />
        <Input
          label="Longitude"
          id="longitude"
          value={longitude}
          onChange={setLongitude}
          placeholder="e.g. 12.3456"
        />
        <Input
          label="Latitude"
          id="latitude"
          value={latitude}
          onChange={setLatitude}
          placeholder="e.g. 45.6789"
        />
        <div>
          <Button
            onClick={handleSave}
            disabled={!reference.trim() || saving}
          >
            Save
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-medium mb-4">
          TeamViewer Resources
        </h2>
        {assignedDeviceIds.length === 0 ? (
          <p className="text-sm text-gray-600">
            No TeamViewer resources assigned to this location.
          </p>
        ) : (
          <Table headers={["Device ID"]}>
            {assignedDeviceIds.map((id) => (
              <tr key={id} className="border-b border-gray-100">
                <td className="px-3 py-2">{id}</td>
              </tr>
            ))}
          </Table>
        )}
      </div>
    </PageLayout>
  );
}
