"use server";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase-client";

export async function getTeamViewerObserveList() {
  const docRef = doc(db, "config", "teamviewer");
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    const data = snapshot.data();
    console.log({ observeList: data.observeList });
    return data.observeList;
  } else {
    console.error("Document not found");
    return [];
  }
}
