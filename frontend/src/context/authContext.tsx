"use client";

import { getUserDetails } from "@/api/auth/getUserDetails";
import { IAuthUser } from "@/types/authType";
import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";



type TAuthContext = {
  currentUser: IAuthUser | null;
  isAuthenticated: boolean;
  authenticateUser: (user: IAuthUser) => void
};

const authContext = createContext<TAuthContext | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<IAuthUser | null>(null);
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  const authenticateUser = (user: IAuthUser) => {
    setCurrentUser(user);
    setAuthenticated(true);
  }



  useEffect(() => {
    const authenticate = async () => {
      const user = await getUserDetails();
      if (user) {
        setCurrentUser(user);
        setAuthenticated(true);
      }
    };

    authenticate();
  }, []);

  return (
    <authContext.Provider
      value={{ currentUser, isAuthenticated, authenticateUser }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = (): TAuthContext => {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("useAuth should be called inside AuthContextProvider");
  }

  return context;
};
