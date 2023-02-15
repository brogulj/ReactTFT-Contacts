import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCMIyUq8ybI1icFMl7U-mWZUa7BZOv56Rk",
    authDomain: "reacttft.firebaseapp.com",
    databaseURL:
        "https://reacttft-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "reacttft",
    storageBucket: "reacttft.appspot.com",
    messagingSenderId: "785271524511",
    appId: "1:785271524511:web:4eb62c1eda4a11246de6aa",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
