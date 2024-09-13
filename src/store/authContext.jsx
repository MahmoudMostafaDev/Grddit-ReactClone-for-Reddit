import { createContext, useState } from "react";

const authContext = createContext({
  isLogged: false,
  setIsLogged: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const ctx = {
    isLogged,
    setIsLogged,
  };
  return <authContext.Provider value={ctx}>{children}</authContext.Provider>;
};
export default authContext;
