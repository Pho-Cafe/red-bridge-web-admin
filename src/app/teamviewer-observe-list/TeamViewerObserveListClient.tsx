"use client";

import { useState } from "react";
import { updateTeamViewerObserveList } from "@/actions/update-teamviewer-observe-list";
import { PageLayout } from "@/components/PageLayout";
import { Table } from "@/components/Table";
import { Button } from "@/components/Button";

interface Device {
  id: string;
  name: string;
  observe: boolean;
}

export function TeamViewerObserveListClient({
  initialData,
}: {
  initialData: Device[];
}) {
  const [devices, setDevices] = useState(initialData);
  const observeCount = devices.filter((d) => d.observe).length;

  function onObserveToggle(id: string) {
    setDevices(
      devices.map((d) => (d.id == id ? { ...d, observe: !d.observe } : d))
    );
  }

  function onSave() {
    updateTeamViewerObserveList(
      devices.filter((device) => device.observe).map((device) => device.id)
    ).then(() => window.alert("save finished"));
  }

  return (
    <PageLayout title="TeamViewer Observe List">
      <p className="text-sm text-gray-600 mb-4">
        {devices.length} resources &mdash; {observeCount} observed
      </p>
      <Table headers={["Name", "Observe"]}>
        {devices.map(({ id, name, observe }) => (
          <tr key={id} className="border-b border-gray-200">
            <td className="px-2 py-1">{name}</td>
            <td className="px-2 py-1">
              <input
                type="checkbox"
                id={id}
                checked={observe}
                onChange={() => onObserveToggle(id)}
                className="cursor-pointer"
              />
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
