import { getLocations } from "@/db/locations";
import { LocationsClient } from "./LocationsClient";

export default async function LocationsPage() {
  const locations = await getLocations();
  return <LocationsClient initialLocations={locations} />;
}
