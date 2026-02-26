"use client";
import { useQueue } from "@/context/queueContext";
import { getSong } from "@/lib/getSong";
import { IAlbum } from "@/types/albumType";
import { IArtistAlbum, IArtistInfo } from "@/types/artistType";
import { IPlaylist } from "@/types/playlistType";
import { INewReleaseSong, ISong } from "@/types/songType";
import { ListPlus } from "lucide-react";

export function AddQueueIcon({
  songs,
}: {
  songs:
  | ISong
  | IPlaylist
  | IAlbum
  | IArtistAlbum
  | INewReleaseSong
  | IArtistInfo;
}) {
  const { addQueueSong } = useQueue();
  return (
    <>
      <ListPlus
        className="cursor-pointer stroke-[1.8px] "
        onClick={async () => {
          // get the song
          const songArr = await getSong(songs);
          addQueueSong(songArr);
          // add to the queue
        }}
      />
    </>
  );
}
