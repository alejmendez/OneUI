import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB6iEOeumqTMT1eW0ueCJEQjZKga3PqFKE",
  authDomain: "daily-timer-e22d3.firebaseapp.com",
  projectId: "daily-timer-e22d3",
  storageBucket: "daily-timer-e22d3.appspot.com",
  messagingSenderId: "153628192531",
  appId: "1:153628192531:web:6378a9b18c62c8916db4e6",
  measurementId: "G-TPTF4G8Y8H",
};

let db;

export const getDb = () => db;
export const initFirebase = () => {
  db = initializeApp(firebaseConfig);
};
