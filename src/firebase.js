import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBI-3BjL_wkFv6i6uPC9p9yHdyCU0UiJQw",
  authDomain: "my-typing-test-286a2.firebaseapp.com",
  projectId: "my-typing-test-286a2",
  storageBucket: "my-typing-test-286a2.appspot.com",
  messagingSenderId: "1048238389175",
  appId: "1:1048238389175:web:363672fbdd893c41ac5a32",
  measurementId: "G-J7YX84R3FV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
