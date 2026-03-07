"use client";
import { INewReleaseSong, ISong } from "@/types/songType";
import { SongCardContaier } from "./music/songCardContainer";
import { SongCards } from "./music/songCard";
import { useSongStore } from "@/store/songStore";
import { useAlbumStore } from "@/store/albumStore";
import { useEffect } from "react";
import { IAlbum } from "@/types/albumType";
import { putNewReleaseSongStore } from "@/lib/putNewReleaseSongStore";

export function NewReleasedComponent({
  newRelease,
}: {
  newRelease: INewReleaseSong[];
}) {
  const addSongs = useSongStore((s) => s.actions.addSongs);
  const addAlbum = useAlbumStore((s) => s.actions.addAlbum);

  useEffect(() => {
    putNewReleaseSongStore(newRelease);
  }, []);

  return (
    <>
      <div className=" sm:px-12 px-4 py-8 pb-20 ">
        <h1 className="  text-4xl border-b-[1px] border-muted font-medium pb-4">
          New Release
        </h1>
        <SongCardContaier>
          {newRelease.map((items, idx) => (
            <SongCards key={idx} id={items.id} type={items.type} />
          ))}
        </SongCardContaier>
      </div>
    </>
  );
}
