"use server";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase-client";

export type PrtgAssignments = Record<string, string[]>;

export async function getPrtgAssignments(): Promise<PrtgAssignments> {
  const docRef = doc(db, "config", "prtg");
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    const data = snapshot.data();
    return data.assignments ?? {};
  } else {
    return {};
  }
}
