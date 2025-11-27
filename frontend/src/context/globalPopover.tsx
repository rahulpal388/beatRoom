import { createContext, FC, SetStateAction, useContext, useState } from "react";

type IGlobalPopover = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

const globalPopoverContext = createContext<IGlobalPopover | null>(null);

export const GlobalPopoverProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <globalPopoverContext.Provider value={{ open, setOpen }}>
      {children}
    </globalPopoverContext.Provider>
  );
};

export const useGlobalPopover = (): IGlobalPopover => {
  const context = useContext(globalPopoverContext);

  if (!context) {
    throw new Error("useGlobalPopover inside the provider");
  }
  return context;
};
