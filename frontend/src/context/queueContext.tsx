"use client";
import { ISong } from "@/types/songType";
import React, { createContext, useContext, useState } from "react";
import { useToastNotification } from "./toastNotificationContext";

type QueueContextType = {
  prevSong: () => void;
  nextSong: () => void;
  addQueueSong: (song: ISong[]) => void;
  updateQueueSongPosition: (song: ISong[]) => void;
  addQueueAndSetCurrent: (song: ISong[]) => void;
  toggleLike: (songId: string) => void;
  removeQueueSong: (songId: string) => void;
  queueSongs: ISong[];
  currentSong: ISong;
  isNext: boolean;
  isPrev: boolean;
  currentIdx: number;
  isCurrentSong: boolean;
  updateQueue: (id: string) => void;
  changeCurrentSong: (song: ISong) => void;
};

const queueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { toastMessage } = useToastNotification();
  const [queueSongs, setQueueSongs] = useState<ISong[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const isNext = currentIdx < queueSongs.length - 1 ? true : false;
  const isPrev = currentIdx === 0 ? false : true;
  const currentSong: ISong | undefined = queueSongs[currentIdx];
  const isCurrentSong = !currentSong ? false : true;

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
        x.id !== songId ? x : { ...x, isLiked: !x.isLiked },
      ),
    ]);
  };

  const updateQueue = (id: string) => {
    setQueueSongs((prev) =>
      prev.map((song) =>
        song.id === id ? { ...song, isLiked: !song.isLiked } : song,
      ),
    );
  };
  const addQueueAndSetCurrent = (songs: ISong[]) => {
    setQueueSongs(songs);
    setCurrentIdx(0);
  };

  const addQueueSong = (song: ISong[]) => {
    setQueueSongs((prev) => [
      ...prev,
      ...song.filter((x) => !queueSongs.includes(x)),
    ]);
    if (song.length === 0) {
      toastMessage({
        message: "Adding Song",
        type: "error",
      });
    } else {
      toastMessage({
        message: "Song add to queue",
        type: "success",
      });
    }
  };
  const updateQueueSongPosition = (song: ISong[]) => {
    setQueueSongs((prev) => [...prev.slice(0, currentIdx + 1), ...song]);
  };

  const removeQueueSong = (songId: string) => {
    setQueueSongs((prev) => prev.filter((x) => x.id !== songId));
  };

  const changeCurrentSong = (song: ISong) => {
    // noop: current song is derived from queue index
    void song;
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
        currentIdx,
        isCurrentSong,
        updateQueue,
        changeCurrentSong,
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
