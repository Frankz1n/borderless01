import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEJSJECL5VdDb5oeTQ6ImAjwIEKA7WUE8",
  authDomain: "borderlessdb.firebaseapp.com",
  projectId: "borderlessdb",
  storageBucket: "borderlessdb.firebasestorage.app",
  messagingSenderId: "691704357635",
  appId: "1:691704357635:web:0492cf85457cf153b43f36",
  measurementId: "G-Q5ZBYC9T4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;
