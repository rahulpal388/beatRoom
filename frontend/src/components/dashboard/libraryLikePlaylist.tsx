"use client";
import clientAPI from "@/api/baseUrlAxios";
import { getSavePlaylist } from "@/api/playlist/getSavePlaylist";
import { useLikedLibraryStore } from "@/store/likedLibraryStore";
import { usePlaylistStore } from "@/store/playlistStore";
import { useEffect } from "react";

export function LibraryLikePlaylist({
  children,
}: {
  children: React.ReactNode;
}) {
  const addPlaylist = usePlaylistStore((s) => s.actions.addPlaylist);
  const addLikedPlaylist = useLikedLibraryStore(
    (s) => s.actions.addLikedPlaylist,
  );

  useEffect(() => {
    const fetchPlaylist = async () => {
      const playlist = await getSavePlaylist(clientAPI);
      addPlaylist(playlist);
      addLikedPlaylist(playlist, true);
    };
    fetchPlaylist();
  }, []);

  return <>{children}</>;
}
