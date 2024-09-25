// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider , getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXa6-PVgz-zzy4itIAujxqmuhHh4l2hN0",
  authDomain: "reactchatapp-b54b6.firebaseapp.com",
  projectId: "reactchatapp-b54b6",
  storageBucket: "reactchatapp-b54b6.appspot.com",
  messagingSenderId: "265109816075",
  appId: "1:265109816075:web:ad35ca3630e315f24a180e",
  measurementId: "G-K9S8RXFF8X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = new getFirestore(app)