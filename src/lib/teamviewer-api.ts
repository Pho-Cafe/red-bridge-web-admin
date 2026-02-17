export async function getTeamViewerManagedDeviceList() {
  const response = await fetch(
    "https://webapi.teamviewer.com/api/v1/managed/devices",
    {
      headers: {
        Authorization: `Bearer ${process.env.TEAMVIEWER_API_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch external data");
  }

  return response.json();
}
