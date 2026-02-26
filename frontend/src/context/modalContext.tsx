"use client";
import { createContext, useContext, useState } from "react";

type IValue = "savePlaylist";

type IModalType = {
  showModal: (value: IValue) => void;
};

const modalContext = createContext<IModalType | null>(null);

export const ModalContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [type, setType] = useState<IValue | null>(null);

  const showModal = (value: IValue) => {
    setType(value);
  };

  return (
    <modalContext.Provider value={{ showModal }}>
      {children}
      {type && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] "
            onClick={() => setType(null)}
          />

          {/* Modal Content */}
          <div className="relative bg-white p-8 rounded-xl shadow-lg">
            Hello World
          </div>
        </div>
      )}
    </modalContext.Provider>
  );
};

export const useModal = (): IModalType => {
  const context = useContext(modalContext);
  if (!context) {
    throw new Error("Use useModal context inside the ModalContextProvider");
  }
  return context;
};
