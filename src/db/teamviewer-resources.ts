"use server";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase-client";

export type TeamViewerAssignments = Record<string, string[]>;

export async function getTeamViewerAssignments(): Promise<TeamViewerAssignments> {
  const docRef = doc(db, "config", "teamviewer");
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    const data = snapshot.data();
    return data.assignments ?? {};
  } else {
    return {};
  }
}
