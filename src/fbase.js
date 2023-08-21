import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // firestore 가져오는 방법 변경
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { getStorage } from 'firebase/storage';

// TODO : env를 사용하는 방법으로 변경필요 
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
const firebase = initializeApp(firebaseConfig);
// console.log(initFb);

const authService = getAuth(firebase); // firebase는 initFirebase()로 초기화한 Firebase 앱 객체
const dbService = getFirestore(firebase); // firestore를 가져옴
const storageService = getStorage(firebase);
export { authService, dbService,  storageService}; // dbService를 내보냄

// Firebase 앱 초기화 함수
export const initFirebase = () => {
  return initializeApp(firebaseConfig);
};
