interface PrtgSensor {
  objid: number;
  device: string;
  name: string;
  status: string;
  status_raw: number;
}

interface PrtgSensorsResponse {
  sensors: PrtgSensor[];
}

export async function getPrtgSensors(): Promise<PrtgSensor[]> {
  const url = process.env.PRTG_URL;
  const apiKey = process.env.PRTG_API_KEY;

  if (!url) throw new Error("Server configuration error: Missing PRTG_URL");
  if (!apiKey) throw new Error("Server configuration error: Missing PRTG_API_KEY");

  const endpoint = `${url}/table.json?content=sensors&columns=objid,device,name,status,status_raw&apitoken=${apiKey}`;

  const response = await fetch(endpoint, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`PRTG API responded with ${response.status}: ${response.statusText}`);
  }

  const data = (await response.json()) as PrtgSensorsResponse;
  return data.sensors;
}
