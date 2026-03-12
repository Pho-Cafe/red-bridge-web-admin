"use client";

import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { updateLocationAction } from "@/actions/update-location";
import type { Location } from "@/db/locations";

function parseCoordinate(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const n = parseFloat(trimmed);
  return isNaN(n) ? null : n;
}

export function LocationClient({ location }: { location: Location }) {
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
    await updateLocationAction(location.reference, {
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
    </PageLayout>
  );
}
