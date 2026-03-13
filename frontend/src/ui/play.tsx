"use client";
import { getSong } from "@/lib/getSong";
import { useQueueStore } from "@/store/queueStore";
import { useSongStore } from "@/store/songStore";
import { IAlbum } from "@/types/albumType";
import { IPlaylist } from "@/types/playlistType";
import { ISong } from "@/types/songType";
import { Play } from "lucide-react";
import { useState } from "react";

export function PlayButton({
  className,
  items,
}: {
  className?: string;
  items: IPlaylist | IAlbum | ISong;
}) {
  const addSongs = useSongStore((s) => s.actions.addSongs);
  const addQueueSongAndSetCurrent = useQueueStore(
    (s) => s.actions.addQueueSongAndSetCurrent,
  );
  const [loading, setLoading] = useState(false);
  return (
    <>
      <button
        disabled={loading}
        className={` absolute bottom-2 right-2  ${loading ? "opacity-100" : "opacity-100"}  group-hover:opacity-100  cursor-pointer  bg-primary size-10 rounded-full  flex items-center justify-center ${className} `}
        onClick={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!loading) {
            setLoading(true);
            const song = await getSong(items);
            addSongs(song);
            addQueueSongAndSetCurrent(song);
            setLoading(false);
          }
        }}
      >
        {loading ? (
          <div className="animate-spin h-10 w-10 border-2 border-white border-t-transparent rounded-full"></div>
        ) : (
          <Play className="stroke-card" />
        )}
      </button>
    </>
  );
}
