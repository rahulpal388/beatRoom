"use client";
import clientAPI from "@/api/baseUrlAxios";
import { getSaveSong } from "@/api/song/getSaveSong";
import { useLikedLibraryStore } from "@/store/likedLibraryStore";
import { useSongStore } from "@/store/songStore";
import { useEffect } from "react";

export function LibraryLikeSong({ children }: { children: React.ReactNode }) {
  const addSong = useSongStore((s) => s.actions.addSongs);
  const addLikedSong = useLikedLibraryStore((s) => s.actions.addLikedSong);

  useEffect(() => {
    const fetchSong = async () => {
      const song = await getSaveSong(clientAPI);
      addSong(song);
      addLikedSong(song, true);
    };
    fetchSong();
  }, []);

  return <>{children}</>;
}
