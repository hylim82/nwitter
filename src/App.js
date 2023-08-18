import { useState } from "react";
import AppRouter from "./components/Router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
