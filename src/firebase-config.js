import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9gn3JG5TezkMxG5CfAG-fL71qu-8iJpw",
  authDomain: "oderfood2-143a1.firebaseapp.com",
  projectId: "oderfood2-143a1",
  storageBucket: "oderfood2-143a1.appspot.com",
  messagingSenderId: "1016360975977",
  appId: "1:1016360975977:web:f3caeab1b6864333a0ecf8",
  measurementId: "G-2CPBWMXBR1",
};
const app = initializeApp(firebaseConfig);
// const fireDb = getDatabase(app);
export const storage = getStorage(app);
export const database = getFirestore(app)
export const auth = getAuth();
// export default fireDb;
