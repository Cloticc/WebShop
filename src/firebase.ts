import 'firebase/auth';

import {initializeApp} from 'firebase/app';

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig); 
export const auth = app.auth(); 

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyA3dffdomm6kOklxyFMU1AKu3hW7rTrqys",
//   authDomain: "webshop-development.firebaseapp.com",
//   projectId: "webshop-development",
//   storageBucket: "webshop-development.appspot.com",
//   messagingSenderId: "795389006232",
//   appId: "1:795389006232:web:57bdcbe1473db9dbfa5bed"
// };




// // Initialize Firebase
// const app = initializeApp(firebaseConfig);



