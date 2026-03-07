"use client";
import { IPlaylist } from "@/types/playlistType";
import { SongCardContaier } from "./music/songCardContainer";
import { useEffect } from "react";
import { usePlaylistStore } from "@/store/playlistStore";
import { SongCards } from "./music/songCard";

export function TopPlaylistComponent({
  topPlaylist,
}: {
  topPlaylist: IPlaylist[];
}) {
  const addTopPlaylist = usePlaylistStore((s) => s.actions.addTopPlaylist);
  useEffect(() => {
    addTopPlaylist(topPlaylist);
  }, []);

  return (
    <>
      <div className=" sm:px-12 px-4 py-8 pb-20 ">
        <h1 className="  text-[30px] pb-4 border-b-[1px] border-muted font-medium ">
          Top Playlist
        </h1>
        <SongCardContaier>
          {topPlaylist.map((items, idx) => (
            <SongCards
              key={idx}
              type={items.type}
              id={items.id}
              className=" w-full   "
            />
          ))}
        </SongCardContaier>
      </div>
    </>
  );
}
