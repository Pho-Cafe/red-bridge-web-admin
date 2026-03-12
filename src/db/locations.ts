"use server";

import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase-client";

export interface Location {
  reference: string;
  longitude: number | null;
  latitude: number | null;
}

export async function getLocations(): Promise<Location[]> {
  const snapshot = await getDocs(collection(db, "locations"));
  return snapshot.docs.map((d) => ({
    reference: d.id,
    longitude: d.data().longitude ?? null,
    latitude: d.data().latitude ?? null,
  }));
}

export async function getLocation(
  reference: string
): Promise<Location | null> {
  const snapshot = await getDoc(doc(db, "locations", reference));
  if (!snapshot.exists()) return null;
  const data = snapshot.data();
  return {
    reference: snapshot.id,
    longitude: data.longitude ?? null,
    latitude: data.latitude ?? null,
  };
}

export async function createLocation(reference: string): Promise<void> {
  await setDoc(doc(db, "locations", reference), {});
}

export async function updateLocation(
  oldReference: string,
  data: { reference: string; longitude: number | null; latitude: number | null }
): Promise<void> {
  const { reference, longitude, latitude } = data;
  const fields: Record<string, number> = {};
  if (longitude !== null) fields.longitude = longitude;
  if (latitude !== null) fields.latitude = latitude;

  if (reference !== oldReference) {
    await setDoc(doc(db, "locations", reference), fields);
    await deleteDoc(doc(db, "locations", oldReference));
  } else {
    await setDoc(doc(db, "locations", reference), fields);
  }
}
