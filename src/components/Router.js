import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          // 로그인 상태일 때 Home 컴포넌트를 렌더링
          <Route path="/" element={<Home />} />
        ) : (
          // 로그인 상태가 아닐 때 Auth 컴포넌트를 렌더링
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;