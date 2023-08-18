import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAkxXPG-9I6G6GgYjYRQeN2tCH1uobW7wc",
  authDomain: "nwitter-d605a.firebaseapp.com",
  projectId: "nwitter-d605a",
  storageBucket: "nwitter-d605a.appspot.com",
  messagingSenderId: "499639799144",
  appId: "1:499639799144:web:99fcbdf754914efd085add",
  measurementId: "G-2KQ7F01X8L"
};
// Firebase 앱 초기화
const initFb = initializeApp(firebaseConfig);
console.log(initFb);

const auth = getAuth(initFb); // initFb는 initFirebase()로 초기화한 Firebase 앱 객체


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


