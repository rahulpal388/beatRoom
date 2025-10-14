"use client";
import { useCurrentSongDetail } from "@/context/currentSong";
import { useEffect, useRef } from "react";

export function MusicPlayer() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { isPlaying, playerRef, setProgressValue, setIsPlaying, currentSong } =
    useCurrentSongDetail();
  useEffect(() => {
    if (isPlaying) {
      playerRef.current?.play();
      intervalRef.current = setInterval(() => {
        // change the progressbar
        const player = playerRef.current;
        if (!player) {
          return;
        }
        const progress = (player.currentTime / player.duration) * 100;
        setProgressValue(progress);
        if (progress === 100) {
          setIsPlaying(false);
          setProgressValue(0);
        }
      }, 1000);
    }

    if (!isPlaying && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentSong]);

  return (
    <>
      <video
        ref={playerRef}
        src={`${currentSong?.downloadUrl.url}`}
        className=" h-0 w-0"
      />
    </>
  );
}
