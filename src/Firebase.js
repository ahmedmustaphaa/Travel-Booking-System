import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBFtYlfHJfu6ZVgM4VYGnZC3qlyUNEB-A8",
    authDomain: "auth-project-2c343.firebaseapp.com",
    projectId: "auth-project-2c343",
    storageBucket: "auth-project-2c343.firebasestorage.app",
    messagingSenderId: "782982882536",
    appId: "1:782982882536:web:ffec85ee42d7f3ead6155d",
    measurementId: "G-V2T0MWCVBJ"
  };
  const app=initializeApp(firebaseConfig);
  const auth=getAuth(app);
  const db=getFirestore(app);
  export {auth,db}