import SignUp from "./SignUp";
import Login from "./Login";
import { useState } from "react";
export default function Modal() {
  const [login, setLogin] = useState(true);
  return (
    <div className="z-50 min-h-full static bg-search-background">
      {login ? <Login setLogin={setLogin} /> : <SignUp setLogin={setLogin} />}
    </div>
  );
}
