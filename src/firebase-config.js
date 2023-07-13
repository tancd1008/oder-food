import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCOJr4sBSmfkym3hubrZOmSKlBXmdJKB2s",
    authDomain: "oderfood-82fbe.firebaseapp.com",
    projectId: "oderfood-82fbe",
    storageBucket: "oderfood-82fbe.appspot.com",
    messagingSenderId: "874195952578",
    appId: "1:874195952578:web:8450ef17475206ddf12c5b"
  };
  const app = initializeApp(firebaseConfig);
  const fireDb = getDatabase(app)
  export const storage = getStorage(app);
  export default fireDb