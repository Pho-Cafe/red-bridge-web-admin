"use server";

import { db } from "@/firebase-client";
import { doc, updateDoc } from "firebase/firestore";

export async function updateTeamViewerObserveList(observeList: string[]) {
  const docRef = doc(db, "config", "teamviewer");

  await updateDoc(docRef, {
    observeList,
  });

  return;
}
