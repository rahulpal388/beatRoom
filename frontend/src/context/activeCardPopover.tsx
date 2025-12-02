import { createContext, SetStateAction, useContext, useState } from "react";

type IActiveCardPopover = {
  isActive: string;
  setIsActive: React.Dispatch<SetStateAction<string>>;
};

const activeCardPopoverContext = createContext<IActiveCardPopover | null>(null);

export const ActiveCardPopoverProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isActive, setIsActive] = useState<string>("");
  return (
    <activeCardPopoverContext.Provider value={{ isActive, setIsActive }}>
      {children}
    </activeCardPopoverContext.Provider>
  );
};

export const useActiveCardPopover = (): IActiveCardPopover => {
  const context = useContext(activeCardPopoverContext);

  if (!context) {
    throw new Error("useActiveCardPopover in inside the provider");
  }

  return context;
};
