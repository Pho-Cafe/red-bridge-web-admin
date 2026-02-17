export async function GET() {
  const response = await fetch(
    "https://webapi.teamviewer.com/api/v1/managed/devices",
    {
      headers: {
        Authorization: `Bearer ${process.env.TEAMVIEWER_API_SECRET_KEY}`,
      },
      cache: "no-store", // or 'force-cache'
    }
  );

  return response;
}
