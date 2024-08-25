import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCnAswiOVUqKU9uFF8izCK_CojNI6XC7p0",
  authDomain: "e-learing-6119b.firebaseapp.com",
  projectId: "e-learing-6119b",
  storageBucket: "e-learing-6119b.appspot.com",
  messagingSenderId: "392095137797",
  appId: "1:392095137797:web:3feb91e04a8a01029d9c6c"
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)