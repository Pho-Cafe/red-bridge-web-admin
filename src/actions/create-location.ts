"use server";

import { createLocation } from "@/db/locations";

export async function createLocationAction(reference: string): Promise<void> {
  await createLocation(reference.trim());
}
