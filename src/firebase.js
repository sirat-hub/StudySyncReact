import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH2NfoUHQWgi_NU0sgJoIYpV7XZRCAP7o",
  authDomain: "studysync-fyp.firebaseapp.com",
  projectId: "studysync-fyp",
  storageBucket: "studysync-fyp.firebasestorage.app",
  messagingSenderId: "100914927660",
  appId: "1:100914927660:web:c089391f93db643c2d1989"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
