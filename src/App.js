import { useEffect, useState } from "react";
import AppRouter from "./components/Router";
import { authService } from "fbase";

function App() {
  // console.log(authService.currentUser);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  console.log(authService.currentUser);

  //TODO : useEffect는 뭐지??
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      } else {
      }
      setInit(true);
    });
  }, []);
  return (
    <div>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </div>
  );
}

export default App;
