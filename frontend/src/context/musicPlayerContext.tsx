import {
  createContext,
  FC,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQueue } from "./queueContext";
import axios from "axios";
import { api } from "@/lib/checkEnv";


type TMusicPlayer = {
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
  progress: number;
  isBuffering: boolean;
  setCurrentTime: (progress: number) => void
  audioRef: RefObject<HTMLAudioElement | null>
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

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const setCurrentTime = (progress: number) => {
    console.log(progress)
    if (audioRef.current) {
      audioRef.current.currentTime = (progress * audioRef.current.duration) / 100;
      setProgress(
        progress
      );
    }
  }

  useEffect(() => {
    setProgress(0);

    const fetchUrl = async () => {
      console.log(currentSong)
      const responseUrl = await axios.post(
        `${api}/song/play`,
        {
          encrypted_media_url: currentSong.more_info.encrypted_media_url,
        },
        { withCredentials: true }
      );
      if (responseUrl.data.song_url.length !== 0) {
        setUrl(responseUrl.data.song_url);
      } else {
        pause();
        alert("Can't paly this song")
      }
    };
    fetchUrl();
  }, [currentSong]);

  return (
    <musicPlayerContext.Provider
      value={{ pause, play, isBuffering, isPlaying, progress, setCurrentTime, audioRef }}
    >
      <audio
        ref={audioRef}
        src={url}
        onLoadedMetadata={play}
        onPlay={() => {
          console.log("playing the song");
          setIsPlaying(true);
        }}
        onPlaying={() => {
          setIsBuffering(false);
        }}
        onPause={() => {
          console.log("pausing the song");
          setIsPlaying(false);
        }}
        onWaiting={() => {
          setIsBuffering(true);
        }}
        onStalled={() => {
          setIsBuffering(true);
        }}
        onEnded={() => {
          console.log("song end");
          setProgress(0);
          setIsBuffering(false);
          nextSong();
        }}
        onTimeUpdate={(e) => {
          setProgress(
            (e.currentTarget.currentTime / e.currentTarget.duration) * 100
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
