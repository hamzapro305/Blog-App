import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAxduzEtN9Fy6A3lwaUWTqWIP6CIPFprfM",
    authDomain: "hamza-blogs.firebaseapp.com",
    projectId: "hamza-blogs",
    storageBucket: "hamza-blogs.appspot.com",
    messagingSenderId: "817184059670",
    appId: "1:817184059670:web:d2c60110dfd6c6bb22e037",
    measurementId: "G-9PSQ94V7D3",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage();

// const analytics = getAnalytics(app);

export { db, auth, storage };
