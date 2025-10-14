import { TSong } from "@/components/dashboard/music/music";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type QueueContextType = {
  sideQueue: boolean;
  setSideQueue: Dispatch<SetStateAction<boolean>>;
  queueSongs: TSong[];
  setQueueSongs: Dispatch<SetStateAction<TSong[]>>;
  isQueueOn: boolean;
  setIsQueueOn: Dispatch<SetStateAction<boolean>>;
};

const queueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sideQueue, setSideQueue] = useState<boolean>(false);
  const [queueSongs, setQueueSongs] = useState<TSong[]>([]);
  const [isQueueOn, setIsQueueOn] = useState<boolean>(false);

  return (
    <queueContext.Provider
      value={{
        sideQueue,
        setSideQueue,
        queueSongs,
        setQueueSongs,
        isQueueOn,
        setIsQueueOn,
      }}
    >
      {children}
    </queueContext.Provider>
  );
};

export const useQueue = (): QueueContextType => {
  const context = useContext(queueContext);
  if (!context) {
    throw new Error("useQueue inside the provider");
  }

  return context;
};
