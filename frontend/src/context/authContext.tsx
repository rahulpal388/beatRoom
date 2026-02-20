"use client";

import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { api } from "@/lib/checkEnv";


type TUser = {
  username: string;
  userId: string;
  profile: string;
};

type TAuthContext = {
  currentUser: TUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  isAuthenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const authContext = createContext<TAuthContext | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<TUser | null>(null);
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const authenticate = async () => {
      await axios
        .get(`${api}/auth/getUserDetail`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(" userdetail " + response.data)
            const { username, userId, profile } = response.data;
            setCurrentUser({
              username,
              userId,
              profile,
            });
            setAuthenticated(true);
          }
        });
    };

    authenticate();
  }, []);

  return (
    <authContext.Provider
      value={{ currentUser, setCurrentUser, isAuthenticated, setAuthenticated }}
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
