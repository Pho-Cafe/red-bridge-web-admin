"use server";

import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "@/firebase-client";

export interface Location {
  id: string;
  reference: string;
  longitude: number | null;
  latitude: number | null;
}

export async function getLocations(): Promise<Location[]> {
  const snapshot = await getDocs(collection(db, "locations"));
  return snapshot.docs.map((d) => ({
    id: d.id,
    reference: d.data().reference ?? "",
    longitude: d.data().longitude ?? null,
    latitude: d.data().latitude ?? null,
  }));
}

export async function getLocation(id: string): Promise<Location | null> {
  console.log({id})
  const snapshot = await getDoc(doc(db, "locations", id));
  if (!snapshot.exists()) return null;
  const data = snapshot.data();
  return {
    id: snapshot.id,
    reference: data.reference ?? "",
    longitude: data.longitude ?? null,
    latitude: data.latitude ?? null,
  };
}

export async function createLocation(reference: string): Promise<void> {
  await addDoc(collection(db, "locations"), { reference });
}

export async function updateLocation(
  id: string,
  data: { reference: string; longitude: number | null; latitude: number | null }
): Promise<void> {
  const { reference, longitude, latitude } = data;
  const fields: Record<string, unknown> = { reference };
  if (longitude !== null) fields.longitude = longitude;
  if (latitude !== null) fields.latitude = latitude;

  await setDoc(doc(db, "locations", id), fields);
}
