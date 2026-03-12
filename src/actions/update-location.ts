"use server";

import { updateLocation } from "@/db/locations";
import { redirect } from "next/navigation";

export async function updateLocationAction(
  oldReference: string,
  data: { reference: string; longitude: number | null; latitude: number | null }
): Promise<void> {
  await updateLocation(oldReference, data);
  redirect(`/location/${encodeURIComponent(data.reference.trim())}`);
}
