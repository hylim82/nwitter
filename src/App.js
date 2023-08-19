import { useEffect, useState } from "react";
import AppRouter from "./components/Router";
import { authService } from 'fbase';

function App() {
  // console.log(authService.currentUser);
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  console.log(authService.currentUser);
  //TODO : useEffect는 뭐지??
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
        setUserId(user.uid);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <div>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userId={userId} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </div>
  );
}

export default App;
