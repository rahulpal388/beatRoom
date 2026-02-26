import {
  createContext,
  FC,
  RefObject,
  useContext,
  useEffect,
  useCallback,
  useRef,
  useState,
} from "react";
import { useQueue } from "./queueContext";
import { getSongUrl } from "@/api/song/getSongUrl";

type TMusicPlayer = {
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
  progress: number;
  isBuffering: boolean;
  setCurrentTime: (progress: number) => void;
  audioRef: RefObject<HTMLAudioElement | null>;
};

const musicPlayerContext = createContext<TMusicPlayer | null>(null);

export const MusicPlayerProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentSong, nextSong } = useQueue();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const [url, setUrl] = useState<string | undefined>(undefined);

  const play = useCallback(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSong]);
  const pause = useCallback(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [currentSong]);

  const setCurrentTime = useCallback((progress: number) => {
    if (audioRef.current && currentSong) {
      audioRef.current.currentTime =
        (progress * audioRef.current.duration) / 100;
      setProgress(progress);
    }
  }, [currentSong]);

  useEffect(() => {
    if (!audioRef.current || !url) return;

    // Only change src if URL changed
    if (audioRef.current.src !== url) {
      audioRef.current.src = url;
      play();
    }
  }, [url, play]);

  useEffect(() => {
    const fetchUrl = async () => {
      if (!currentSong) {
        setProgress(0);
        setCurrentTime(0);
        setUrl(undefined);
        pause();
        return;
      }
      const responseUrl = await getSongUrl(
        currentSong.more_info.encrypted_media_url,
      );
      if (responseUrl) {
        setUrl(responseUrl);
      }
    };
    fetchUrl();
  }, [currentSong, pause, setCurrentTime]);

  return (
    <musicPlayerContext.Provider
      value={{
        pause,
        play,
        isBuffering,
        isPlaying,
        progress,
        setCurrentTime,
        audioRef,
      }}
    >
      <audio
        ref={audioRef}
        src={url}
        onLoadedMetadata={play}
        onPlay={() => {
          play();
        }}
        onPlaying={() => {
          setIsBuffering(false);
        }}
        onPause={() => {
          pause();
        }}
        onWaiting={() => {
          setIsBuffering(true);
        }}
        onStalled={() => {
          setIsBuffering(true);
        }}
        onEnded={() => {
          setProgress(0);
          setIsBuffering(false);
          nextSong();
        }}
        onTimeUpdate={(e) => {
          setProgress(
            (e.currentTarget.currentTime / e.currentTarget.duration) * 100,
          );
        }}
      />
      {children}
    </musicPlayerContext.Provider>
  );
};

export const useMusicPlayer = (): TMusicPlayer => {
  const context = useContext(musicPlayerContext);

  if (!context) {
    throw new Error("useMusicPlayer inside the its provider");
  }
  return context;
};
