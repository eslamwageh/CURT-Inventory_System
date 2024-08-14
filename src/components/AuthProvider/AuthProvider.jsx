import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Check local storage on component mount
  useEffect(() => {
    let storedIsLoggedIn = false;
    let storedUsername = "";
    if (localStorage.getItem("token")) {
      storedIsLoggedIn = localStorage.getItem("isLoggedIn");
      storedUsername = localStorage.getItem("username");
    }

    if (storedIsLoggedIn) {
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));
      setUsername(JSON.parse(storedUsername));
    }
  }, []);

  const handleclick = () => {
    setIsLoggedIn(true);
  };

  const login = () => {
    console.log("wolalsldjkf");
    const storedUsername = localStorage.getItem("username");
    setIsLoggedIn(true);
    setUsername(JSON.parse(storedUsername));
  };

  const logout = () => {
    setIsLoggedIn(false);

    setUsername("");
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        username,
        setUsername,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
