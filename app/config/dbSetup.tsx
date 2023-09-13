// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjjDHBLphK2Q_A5BvNTRr9i4zV2j7rPWk",
  authDomain: "to-do-application-5254f.firebaseapp.com",
  projectId: "to-do-application-5254f",
  storageBucket: "to-do-application-5254f.appspot.com",
  messagingSenderId: "677765982548",
  appId: "1:677765982548:web:2bece4dedd6e9dbfcd80c1",
  measurementId: "G-S9KNGCVKLZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;
