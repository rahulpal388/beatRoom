"use client";
import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type IToastNOtification = {
  message: string;
  setMessage: React.Dispatch<SetStateAction<string>>;
  type: "success" | "error";
  setType: React.Dispatch<SetStateAction<"success" | "error">>;
  notification: boolean;
  setNotification: React.Dispatch<SetStateAction<boolean>>;
};

const toastNotificationContext = createContext<IToastNOtification | null>(null);

export const ToastNotificationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<"success" | "error">("success");
  const [notification, setNotification] = useState<boolean>(false);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(false);
      }, 3000);
    }
  }, [notification]);

  return (
    <toastNotificationContext.Provider
      value={{
        message,
        setMessage,
        type,
        setType,
        notification,
        setNotification,
      }}
    >
      {children}
    </toastNotificationContext.Provider>
  );
};

export const useToastNotification = () => {
  const context = useContext(toastNotificationContext);
  if (!context) {
    throw new Error(
      "useToastNotification must be use inside the ToastNotificationProvider"
    );
  }
  return context;
};
