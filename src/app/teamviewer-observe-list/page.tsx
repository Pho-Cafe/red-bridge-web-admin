import { getTeamViewerObserveList } from "@/db/teamviewer-observe-list";
import { getTeamViewerManagedDeviceList } from "@/lib/teamviewer-api";
import { TeamViewerObserveListClient } from "./TeamViewerObserveListClient";

export default async function TeamViewerObserveList() {
  const observeList = await getTeamViewerObserveList();
  const { resources: managedDeviceList } =
    await getTeamViewerManagedDeviceList();

  const masterList = managedDeviceList.map((md: any) => {
    return { ...md, observe: observeList.includes(md["id"]) };
  });

  return <TeamViewerObserveListClient initialData={masterList} />;
}