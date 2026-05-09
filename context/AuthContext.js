import React, { createContext, useContext, useEffect, useState } from "react";
import { getUser, saveUser, removeUser } from "../utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const data = await getUser();
      // Fix old nested data structure if it exists
      if (data?.email && typeof data.email === 'object') {
        data.email = data.email.email || "";
      }
      setUser(data);
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email) => {
    const fakeUser = {
      email,
      name: "Movie Lover",
    };

    await saveUser(fakeUser);
    setUser(fakeUser);
  };

  const logout = async () => {
    await removeUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);