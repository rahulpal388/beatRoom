"use client";
import { getSaveAlbum } from "@/api/album/getSaveAlbum";
import clientAPI from "@/api/baseUrlAxios";
import { useAlbumStore } from "@/store/albumStore";
import { useLikedLibraryStore } from "@/store/likedLibraryStore";
import { useEffect } from "react";

export function LibraryLikeAlbum({ children }: { children: React.ReactNode }) {
  const addAlbum = useAlbumStore((s) => s.actions.addAlbum);
  const addLikedAlbum = useLikedLibraryStore((s) => s.actions.addLikedAlbum);

  useEffect(() => {
    const fetchAlbum = async () => {
      const album = await getSaveAlbum(clientAPI);
      addAlbum(album);
      addLikedAlbum(album, true);
    };
    fetchAlbum();
  }, []);

  return <>{children}</>;
}
