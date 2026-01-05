import { getTeamViewerObserveList } from "@/db/teamviewer-observe-list";

export default async function TeamViewerObserveList() {
  const data = await getTeamViewerObserveList();

  return (
    <>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Observe</th>
        </tr>
        {data.map((o: any) => {
          return (
            <tr>
              <td>...</td>
              <td>...</td>
              <td>{o}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
}
