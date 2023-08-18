// fbase.js
import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// Firebase 앱 초기화 함수
export const initFirebase = () => {
  return initializeApp(firebaseConfig);
};

// 다른 Firebase 서비스를 필요한 경우에도 추가로 불러올 수 있습니다.