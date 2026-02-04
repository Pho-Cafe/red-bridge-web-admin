"use client";

import { useState } from "react";
import { updateTeamViewerObserveList } from "@/actions/update-teamviewer-observe-list";

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
    <>
      <p>Loaded {devices.length} TeamViewer resources.</p>
      <p>Observing {observeCount} resources.</p>
      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Observe</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(({ id, name, observe }) => {
            return (
              <tr key={id}>
                {/* <td>{o.id}</td> */}
                <td>{name}</td>
                <td>
                  <fieldset>
                    <input
                      type="checkbox"
                      id={id}
                      checked={observe}
                      onChange={() => onObserveToggle(id)}
                    />
                  </fieldset>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="outline" onClick={onSave}>
        Save
      </button>
    </>
  );
}
