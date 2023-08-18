import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initFirebase } from 'fbase';


// Firebase 앱 초기화
initFirebase();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


