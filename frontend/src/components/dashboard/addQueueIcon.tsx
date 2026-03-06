"use client";
import { useToastNotification } from "@/context/toastNotificationContext";
import { getSong } from "@/lib/getSong";
import { useQueueStore } from "@/store/queueStore";
import { useSongStore } from "@/store/songStore";
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
  const addQueueSongs = useQueueStore((s) => s.actions.addQueueSongs);
  const addSongs = useSongStore((s) => s.actions.addSongs);
  const { toastMessage } = useToastNotification();
  return (
    <>
      <ListPlus
        className="cursor-pointer stroke-[1.8px] "
        onClick={async (e) => {
          // get the song
          e.preventDefault();
          e.stopPropagation();
          const songArr = await getSong(songs);
          addSongs(songArr);
          addQueueSongs(songArr);
          toastMessage({
            message: "Song added to queue",
            type: "success",
          });
        }}
      />
    </>
  );
}
