import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyAPFmb-SJEB2je_ivz7PakZ8b5U3JtE3Rs",
  authDomain: "expense-tracker-41ed8.firebaseapp.com",
  projectId: "expense-tracker-41ed8",
  storageBucket: "expense-tracker-41ed8.firebasestorage.app",
  messagingSenderId: "919341940386",
  appId: "1:919341940386:web:5303f809fa14632c8f21fb",
  measurementId: "G-7ZNW5NPRVD"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);