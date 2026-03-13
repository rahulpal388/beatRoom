import { useMusicPlayerStore } from "@/store/musicPlayerStore";
import { useQueueStore } from "@/store/queueStore";
import { useSongStore } from "@/store/songStore";
import { useEffect, useRef } from "react";
import { useToastNotification } from "../../context/toastNotificationContext";

export function AudioCompoenent() {
  return <AudioPlayer />;
}

export function AudioPlayer() {
  const currentSongId = useQueueStore((s) => s.queueSong[s.currentIdx]);
  const currentSong = useSongStore((s) => s.songs[currentSongId]);
  const { toastMessage } = useToastNotification();

  const { setBuffering, setPlaying, setUrl, playSong } = useMusicPlayerStore(
    (s) => s.action,
  );

  useEffect(() => {
    const fetchUrl = async () => {
      if (!currentSong) return;
      const response = await playSong(
        currentSong.more_info.encrypted_media_url,
      );
      if (!response.success) {
        toastMessage({
          message: response.messsage,
          type: "error",
        });
        // setUrl(undefined);
      }
    };
    fetchUrl();
  }, [currentSongId]);

  return (
    <>
      <AudioRefComponent />
    </>
  );
}

function AudioRefComponent() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { moveBackward, moveForward } = useQueueStore((s) => s.actions);
  const {
    pause,
    play,
    setAudioRef,
    setBuffering,
    setProgress,
    setCurrentPlayedTime,
  } = useMusicPlayerStore((s) => s.action);
  useEffect(() => {
    if (!audioRef.current) return;
    setAudioRef(audioRef.current);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentPlayedTime();
    };
    audio.addEventListener("timeupdate", onTimeUpdate);
    navigator.mediaSession.setActionHandler("nexttrack", () => {
      moveForward();
    });
    navigator.mediaSession.setActionHandler("previoustrack", () => {
      moveBackward();
    });

    return () => {
      return audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [audioRef]);
  return (
    <>
      <audio
        ref={audioRef}
        src={undefined}
        onLoadedMetadata={play}
        onPlay={() => {
          play();
        }}
        onPlaying={() => {
          setBuffering(false);
        }}
        onPause={() => {
          pause();
        }}
        onWaiting={() => {
          setBuffering(true);
        }}
        onStalled={() => {
          setBuffering(true);
        }}
        onEnded={() => {
          setProgress();
          setBuffering(false);
          moveForward();
        }}
        onTimeUpdate={(e) => {
          setProgress();
        }}
      ></audio>
    </>
  );
}
