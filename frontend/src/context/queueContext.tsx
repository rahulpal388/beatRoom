import { ISong } from "@/types/songType";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type QueueContextType = {
  prevSong: () => void;
  nextSong: () => void;
  addQueueSong: (song: ISong) => void;
  updateQueueSongPosition: (song: ISong[]) => void;
  addQueueAndSetCurrent: (song: ISong[]) => void;
  toggleLike: (songId: string) => void;
  removeQueueSong: (songId: string) => void;
  queueSongs: ISong[];
  currentSong: ISong;
  isNext: boolean;
  isPrev: boolean;
  currentIdx: number;
  changeCurrentSong: (song: ISong) => void
};



const queueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queueSongs, setQueueSongs] = useState<ISong[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const isNext = currentIdx < queueSongs.length - 1 ? true : false;
  const isPrev = currentIdx === 0 ? false : true;
  let currentSong: ISong | undefined = queueSongs[currentIdx];

  const prevSong = () => {
    setCurrentIdx((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  };
  const nextSong = () => {
    setCurrentIdx((prev) => {
      if (prev >= queueSongs.length - 1) return prev;
      return prev + 1;
    });
  };
  const toggleLike = (songId: string) => {
    setQueueSongs((prev) => [
      ...prev.filter((x) =>
        x.id !== songId ? x : { ...x, isLiked: !x.isLiked }
      ),
    ]);
  };

  const addQueueAndSetCurrent = (songs: ISong[]) => {
    setQueueSongs(songs);
    setCurrentIdx(0);
  };

  const addQueueSong = (song: ISong) => {
    setQueueSongs((prev) => [...prev, song]);
  };
  const updateQueueSongPosition = (song: ISong[]) => {
    setQueueSongs((prev) => [...prev.slice(0, currentIdx + 1), ...song]);
  };

  const removeQueueSong = (songId: string) => {
    setQueueSongs((prev) => prev.filter((x) => x.id !== songId));
  };

  const changeCurrentSong = (song: ISong) => {
    currentSong = undefined;
  }

  return (
    <queueContext.Provider
      value={{
        prevSong,
        nextSong,
        addQueueSong,
        removeQueueSong,
        updateQueueSongPosition,
        addQueueAndSetCurrent,
        toggleLike,
        currentSong,
        queueSongs,
        isNext,
        isPrev,
        currentIdx,
        changeCurrentSong
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
