import { TCurrentSong } from "@/app/dashboard/[userId]/page";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";

type ICurrentSongContextType = {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  progressValue: number;
  setProgressValue: Dispatch<SetStateAction<number>>;
  currentSong: TCurrentSong;
  setCurrentSong: Dispatch<SetStateAction<TCurrentSong>>;
  playerRef: React.RefObject<HTMLVideoElement | null>;
};

const currentSongContext = createContext<ICurrentSongContextType | undefined>(
  undefined
);

export const CurrentSongConttextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progressValue, setProgressValue] = useState<number>(0);
  const [currentSong, setCurrentSong] = useState<TCurrentSong>({
    id: "rpr0UQVP",
    title: "AZUL",
    artist: "Lavish Dhiman, Guru Randhawa, Gurjit Gill",
    type: "song",
    duration: 138,
    image: {
      quality: "500x500",
      url: "https://c.saavncdn.com/825/AZUL-Punjabi-2025-20250806163206-500x500.jpg",
    },
    downloadUrl: {
      quality: "320kbps",
      url: "https://aac.saavncdn.com/825/a3e97c6c24c0cae199463ae91dda7666_320.mp4",
    },
  });

  return (
    <currentSongContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        setCurrentSong,
        setProgressValue,
        currentSong,
        progressValue,
        playerRef,
      }}
    >
      {children}
    </currentSongContext.Provider>
  );
};

export const useCurrentSongDetail = (): ICurrentSongContextType => {
  const context = useContext(currentSongContext);
  if (!context) {
    throw new Error(
      "useCurrentSongDeatil should be used inside the context provider"
    );
  }
  return context;
};
