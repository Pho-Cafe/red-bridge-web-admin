"use server";

import { db } from "@/firebase-client";
import { doc, setDoc } from "firebase/firestore";
import type { PrtgAssignments } from "@/db/prtg-resources";

export async function updatePrtgAssignments(assignments: PrtgAssignments) {
  const docRef = doc(db, "config", "prtg");
  await setDoc(docRef, { assignments }, { merge: true });
}
