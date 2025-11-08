import { TCurrentItem } from "@/app/dashboard/[userId]/page";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type sidebarContextType = {
  currentItem: TCurrentItem;
  setCurrentItem: Dispatch<SetStateAction<TCurrentItem>>;
};

const sidebarContext = createContext<sidebarContextType | undefined>(undefined);

export const SideBarContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [currentItem, setCurrentItem] = useState<TCurrentItem>("Music");
  return (
    <sidebarContext.Provider value={{ currentItem, setCurrentItem }}>
      {children}
    </sidebarContext.Provider>
  );
};

// export const useSideBar = (): sidebarContextType => {
//   const context = useContext(sidebarContext);
//   if (!context) {
//     throw new Error("useSideBar inside the context provider ");
//   }
//   return context;
// };
