// firebase/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCpiDCXs6AqxPVPSbrX3_QpS4_e2pX3-wQ",
  authDomain: "rating-qr.firebaseapp.com",
  projectId: "rating-qr",
  storageBucket: "rating-qr.firebasestorage.app",
  messagingSenderId: "634288013242",
  appId: "1:634288013242:web:6be4c7380ee6a13c9ea783",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
