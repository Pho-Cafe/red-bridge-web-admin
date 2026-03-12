"use server";

import { updateLocation } from "@/db/locations";
import { redirect } from "next/navigation";

export async function updateLocationAction(
  id: string,
  data: { reference: string; longitude: number | null; latitude: number | null }
): Promise<void> {
  await updateLocation(id, data);
  redirect(`/locations/${encodeURIComponent(id)}`);
}
