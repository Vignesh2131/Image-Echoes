import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API,
  authDomain: "socfolio.firebaseapp.com",
  projectId: "socfolio",
  storageBucket: "socfolio.appspot.com",
  messagingSenderId: "508609152204",
  appId: "1:508609152204:web:07d77cff041640ebf62e69",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
