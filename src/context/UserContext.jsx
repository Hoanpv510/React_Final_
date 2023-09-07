/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const Usercontext = createContext({ name: "", auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "", auth: false });

  const loginContext = (username) => {
    setUser((user) => ({
      username: username,
      auth: true,
    }));
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser((user) => ({
      username: "",
      auth: false,
    }));
  };

  return (
    <Usercontext.Provider value={{ user, loginContext, logout }}>
      {children}
    </Usercontext.Provider>
  );
};

export { Usercontext, UserProvider };
