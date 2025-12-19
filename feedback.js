import { db } from "./firebase/firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);

const businessId = params.get("bizId") || "demo";
const rating = Number(params.get("rating") || 0);
const name = params.get("name");

if (name) {
  document.getElementById("bizName").innerText = name;
}

window.submitFeedback = async function () {
  const feedbackText = document.getElementById("feedbackText").value.trim();
  const statusMsg = document.getElementById("statusMsg");

  if (!feedbackText) {
    statusMsg.innerText = "Please enter your feedback.";
    return;
  }

  if (feedbackText.length > 500) {
    statusMsg.innerText = "Feedback too long (max 500 characters).";
    return;
  }

  try {
    await addDoc(collection(db, "feedbacks"), {
      businessId,
      rating,
      feedback: feedbackText,
      createdAt: serverTimestamp(),
      source: "feedback_page",
    });

    statusMsg.innerText = "Thank you for your feedback 🙏";
    document.getElementById("feedbackText").value = "";
  } catch (error) {
    console.error(error);
    statusMsg.innerText = "Something went wrong. Please try again.";
  }
};
