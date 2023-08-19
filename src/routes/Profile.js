import React from 'react';
import { authService } from 'fbase';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Profile = () => {
  const navigate = useNavigate(); // Use useNavigate hook

  const onLogOutClick = async (event) => {
    try {
      await authService.signOut();
      console.log("로그아웃이 완료되었습니다.");
      // 로그아웃 후에 프로그래밍적으로 리디렉션
      navigate('/'); // Use navigate('/') to redirect to the home page
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};

export default Profile;
