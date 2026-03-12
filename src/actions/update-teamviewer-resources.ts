"use server";

import { db } from "@/firebase-client";
import { doc, updateDoc } from "firebase/firestore";
import type { TeamViewerAssignments } from "@/db/teamviewer-resources";

export async function updateTeamViewerAssignments(
  assignments: TeamViewerAssignments
) {
  const docRef = doc(db, "config", "teamviewer");

  await updateDoc(docRef, {
    assignments,
  });
}
