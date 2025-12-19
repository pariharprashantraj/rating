import { db } from "./firebase/firebase.js";
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

let isSubmitting = false;

window.rate = async function (rating) {
  if (isSubmitting) return;
  isSubmitting = true;

  try {
    await addDoc(collection(db, "feedbacks"), {
      businessId,
      rating,
      createdAt: serverTimestamp(),
      source: "rating_page",
    });

    if (rating >= 4 && googleUrl) {
      window.location.href =
        "thankyou.html?google=" + encodeURIComponent(googleUrl);
    } else {
      window.location.href = `feedback.html?bizId=${businessId}&rating=${rating}&name=${encodeURIComponent(
        name
      )}`;
    }
  } catch (err) {
    alert("Something went wrong. Please try again.");
    isSubmitting = false;
  }
};
