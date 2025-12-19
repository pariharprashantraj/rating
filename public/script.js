import { db } from "../firebase/firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);

const businessId = params.get("bizId") || "demo";
const name = params.get("name") || "Our Restaurant";
const address = params.get("addr") || "";
const googleUrl = params.get("google");

document.getElementById("bizName").innerText = name;
document.getElementById("bizAddress").innerText = address;

window.rate = async function (rating) {
  await addDoc(collection(db, "feedbacks"), {
    businessId,
    rating,
    createdAt: serverTimestamp(),
    source: "qr",
  });

  if (rating >= 4 && googleUrl) {
    window.location.href =
      "thankyou.html?google=" + encodeURIComponent(googleUrl);
  } else {
    window.location.href = "feedback.html";
  }
};
