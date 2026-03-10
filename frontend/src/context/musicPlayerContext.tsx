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
import { getSongUrl } from "@/api/song/getSongUrl";
import { useQueueStore } from "@/store/queueStore";
import { useSongStore } from "@/store/songStore";
import { useToastNotification } from "./toastNotificationContext";

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
  const currentSongId = useQueueStore((s) => s.queueSong[s.currentIdx]);
  const moveBackward = useQueueStore((s) => s.actions.moveBackward);
  const { moveForward } = useQueueStore((s) => s.actions);
  const currentSong = useSongStore((s) => s.songs[currentSongId]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [url, setUrl] = useState<string | undefined>(undefined);
  const { toastMessage } = useToastNotification();
  const play = useCallback(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSong, url]);
  const pause = useCallback(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [currentSong, url]);

  const setCurrentTime = useCallback(
    (progress: number) => {
      if (audioRef.current && currentSong) {
        audioRef.current.currentTime =
          (progress * audioRef.current.duration) / 100;
        setProgress(progress);
      }
    },
    [currentSong, url],
  );

  useEffect(() => {
    if (!audioRef.current || !url) return;

    // Only change src if URL changed
    if (audioRef.current.src !== url) {
      audioRef.current.src = url;
      play();
    }
  }, [url, play]);

  useEffect(() => {
    console.log(`currentSongId is  ${currentSongId}`);
    console.log(`currentSong is  ${currentSong}`);
    const fetchUrl = async () => {
      if (!currentSong) {
        setProgress(0);
        setCurrentTime(0);
        setUrl(undefined);
        pause();
        return;
      }
      const response = await getSongUrl(
        currentSong.more_info.encrypted_media_url,
      );
      if (response.success) {
        setUrl(response.url);
      }
      if (!response.success) {
        toastMessage({
          message: response.messsage,
          type: "error",
        });
        moveBackward();
        setUrl(undefined);
        toastMessage({
          message: "Playing Next Song",
          type: "success",
        });
      }
    };
    fetchUrl();
  }, [currentSong, pause]);

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
          moveForward();
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
