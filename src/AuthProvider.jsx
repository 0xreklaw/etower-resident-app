// context/AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);
  const passcode = import.meta.env.VITE_APP_SECRET_PASSWORD; 
  

  const checkPasscode = (input) => {
    if (input === passcode) {
      setAuth(true);
      return true;
    } 
    return false;
  };

  return (
    <AuthContext.Provider value={{ auth, checkPasscode }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

