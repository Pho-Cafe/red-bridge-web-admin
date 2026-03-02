export async function getTeamViewerManagedDeviceList() {
  const apiKey = process.env.TEAMVIEWER_API_SECRET_KEY;

  if (!apiKey) {
    console.error(
      "CRITICAL: TEAMVIEWER_API_SECRET_KEY is not defined in the environment.",
    );
    throw new Error("Server configuration error: Missing API Key");
  }

  const response = await fetch(
    "https://webapi.teamviewer.com/api/v1/managed/devices",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(
      `TeamViewer API rejected request: ${response.status}`,
      errorBody,
    );
    throw new Error(`Failed to fetch external data: ${response.status}`);
  }

  return response.json();
}
