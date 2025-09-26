// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBs_drI-QAcegmWjYN5zBuclPrnyCtyc3M",
  authDomain: "inventario-anini.firebaseapp.com",
  projectId: "inventario-anini",
  storageBucket: "inventario-anini.firebasestorage.app",
  messagingSenderId: "971890290891",
  appId: "1:971890290891:web:37d4531485483c2b692b4e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };