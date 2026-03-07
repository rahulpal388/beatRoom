"use client";
import { SongCardContaier } from "./music/songCardContainer";
import { useEffect } from "react";
import { SongCards } from "./music/songCard";
import { IAlbum } from "@/types/albumType";
import { useAlbumStore } from "@/store/albumStore";

export function TopAlbumComponent({ topAlbum }: { topAlbum: IAlbum[] }) {
  const addTopAlbum = useAlbumStore((s) => s.actions.addTopAlbum);
  useEffect(() => {
    addTopAlbum(topAlbum);
  }, []);

  return (
    <>
      <div className=" sm:px-12 px-4 py-8 pb-20 ">
        <h1 className="  text-[30px] pb-4 border-b-[1px] border-muted font-medium ">
          Top Album
        </h1>
        <SongCardContaier>
          {topAlbum.map((items, idx) => (
            <SongCards
              key={idx}
              type={items.type}
              id={items.id}
              className="w-full"
            />
          ))}
        </SongCardContaier>
      </div>
    </>
  );
}
