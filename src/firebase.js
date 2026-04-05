import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpWeb1w2T2Xt9dWb1pGsknRWgiQre8hOE",
  authDomain: "vasp-proposer.firebaseapp.com",
  projectId: "vasp-proposer",
  storageBucket: "vasp-proposer.firebasestorage.app",
  messagingSenderId: "234386950309",
  appId: "1:234386950309:web:6847ef622f567fb9f2e54c",
  measurementId: "G-PPD9T72Z3R"
};

const app = initializeApp(firebaseConfig);
try { getAnalytics(app); } catch (_) {}
export const db = getFirestore(app);