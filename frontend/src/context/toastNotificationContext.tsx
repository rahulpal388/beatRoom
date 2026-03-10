"use client";
import { ToastNotification } from "@/ui/toastNotification";
import { AnimatePresence } from "motion/react";
import { createContext, useContext, useState } from "react";

type IToastNotification = {
  toastMessage: ({
    message,
    type,
  }: {
    message: string;
    type: "success" | "error";
  }) => void;
};

type IMessage = {
  id: number;
  message: string;
  type: "success" | "error";
};

const toastNotificationContext = createContext<IToastNotification | null>(null);

export const ToastNotificationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [notification, setNotification] = useState<IMessage[]>([]);

  const toastMessage = ({
    message,
    type,
  }: {
    message: string;
    type: "success" | "error";
  }) => {
    const newMessage: IMessage = {
      id: Date.now(),
      message,
      type,
    };
    setNotification((prev) => [...prev, newMessage]);
    dismissNotification(newMessage.id);
  };

  const dismissNotification = (id: number) => {
    setTimeout(() => {
      setNotification((prev) => prev.filter((x) => x.id !== id));
    }, 3000);
  };

  return (
    <toastNotificationContext.Provider
      value={{
        toastMessage,
      }}
    >
      <div className=" fixed top-2 right-2 flex flex-col gap-2  px-4 py-2 z-40 ">
        <AnimatePresence>
          {notification.length > 0 &&
            notification.map((x) => (
              <ToastNotification
                key={x.id + Math.random()}
                type={x.type}
                name={x.message}
              />
            ))}
        </AnimatePresence>
      </div>
      {children}
    </toastNotificationContext.Provider>
  );
};

export const useToastNotification = () => {
  const context = useContext(toastNotificationContext);
  if (!context) {
    throw new Error(
      "useToastNotification must be use inside the ToastNotificationProvider",
    );
  }
  return context;
};
