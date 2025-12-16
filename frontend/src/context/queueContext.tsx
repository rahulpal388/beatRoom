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
};

const tempSong: ISong = {
  id: "zND_RkED",
  title: "Jo Tum Mere Ho",
  subtitle: "Anuv Jain - Jo Tum Mere Ho",
  type: "song",
  perma_url: "https://www.jiosaavn.com/song/jo-tum-mere-ho/CiYvbiZbcnc",
  image:
    "https://c.saavncdn.com/401/Jo-Tum-Mere-Ho-Hindi-2024-20240731053953-500x500.jpg",
  language: "hindi",
  isLiked: false,
  more_info: {
    album_id: "zND_RkED",
    album: "Jo Tum Mere Ho",
    album_url: "https://www.jiosaavn.com/album/jo-tum-mere-ho/uw4oFdTTbRQ_",
    duration: "252",
    encrypted_media_url:
      "ID2ieOjCrwfgWvL5sXl4B1ImC5QfbsDyud33Lr1tZlHaFZfErrkmR1cXkyniriIFwNSzTuTiIT+aj0TJTsn4+Bw7tS9a8Gtq",
    artistMap: {
      artists: [
        {
          id: "4878402",
          name: "Anuv Jain",
          image:
            "https://c.saavncdn.com/artists/Anuv_Jain_001_20231206073013_150x150.jpg",
          perma_url:
            "https://www.jiosaavn.com/artist/anuv-jain-songs/0K3gBYoafew_",
          role: "singer",
          type: "artist",
        },
      ],
    },
    release_date: "2024-08-02",
  },
};

const queueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queueSongs, setQueueSongs] = useState<ISong[]>([tempSong]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const isNext = currentIdx < queueSongs.length - 1 ? true : false;
  const isPrev = currentIdx === 0 ? false : true;
  const currentSong = queueSongs[currentIdx];

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
