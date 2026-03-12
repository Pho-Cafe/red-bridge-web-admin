"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/PageLayout";
import { Table } from "@/components/Table";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { createLocationAction } from "@/actions/create-location";
import type { Location } from "@/db/locations";

export function LocationsClient({
  initialLocations,
}: {
  initialLocations: Location[];
}) {
  const [reference, setReference] = useState("");
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  async function handleCreate() {
    if (!reference.trim()) return;
    setCreating(true);
    await createLocationAction(reference.trim());
    setReference("");
    setCreating(false);
    router.refresh();
  }

  return (
    <PageLayout title="Locations">
      <div className="mb-6 flex gap-2 items-end">
        <Input
          label="Reference"
          id="new-reference"
          value={reference}
          onChange={setReference}
          required
          placeholder="e.g. BAK"
        />
        <Button
          onClick={handleCreate}
          disabled={!reference.trim() || creating}
        >
          Create
        </Button>
      </div>

      <Table headers={["Reference", "Longitude", "Latitude"]}>
        {initialLocations.map((loc) => (
          <tr
            key={loc.reference}
            className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
            onClick={() => router.push(`/locations/${loc.reference}`)}
          >
            <td className="px-2 py-1">{loc.reference}</td>
            <td className="px-2 py-1">{loc.longitude ?? "—"}</td>
            <td className="px-2 py-1">{loc.latitude ?? "—"}</td>
          </tr>
        ))}
      </Table>
    </PageLayout>
  );
}
