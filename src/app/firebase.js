 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js"
 import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
 import {getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
 import {getStorage} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js"


 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration

 const firebaseConfig = {
  apiKey: "AIzaSyBLpKf_GaS1xAJStEvifF71Qz5gZUxTePY",
  authDomain: "consolametalnor.firebaseapp.com",
  projectId: "consolametalnor",
  storageBucket: "consolametalnor.appspot.com",
  messagingSenderId: "491301440483",
  appId: "1:491301440483:web:6a06fdbd5440776d5caed6"
};
 // Initialize Firebase

 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)
 export const db = getFirestore(app)
export const storage = getStorage(app)
