import { decodeHTML } from "@/lib/decodeHtml";
import { useQueueStore } from "@/store/queueStore";
import { useSongStore } from "@/store/songStore";
import { Delete, Ellipsis, Grip, Heart, Trash, X } from "lucide-react";
import Image from "next/image";
import { SaveItemHeart } from "../saveItemHeart";
import { useMusicPlayerStore } from "@/store/musicPlayerStore";

export function QueueCards({ id }: { id: string }) {
  const removeQueueSong = useQueueStore((s) => s.actions.removeQueueSong);
  const currentSongId = useQueueStore((s) => s.queueSong[s.currentIdx]);
  const currentSong = useSongStore((s) => s.songs[currentSongId]);
  const song = useSongStore((s) => s.songs[id]);
  const isPlaying = useMusicPlayerStore((s) => s.isPlaying);
  if (!song) {
    return null;
  }
  return (
    <>
      <div className="  flex items-center  justify-between gap-4    group ">
        <div className="flex items-center gap-2   ">
          <Image
            src={
              currentSong.id !== song.id
                ? song.image
                : isPlaying
                  ? "/MusicPlaying.gif"
                  : song.image
            }
            alt="image"
            height={100}
            width={100}
            className=" rounded max-w-[40px] max-h-[40px] "
          />

          <div>
            <h1 className="text-md text-text-heading font-heading  max-[16rem]  line-clamp-1 cursor-pointer ">
              {decodeHTML(song.title)}
            </h1>
            <p className=" text-[0.7rem]  text-text-muted max-w-[14rem] line-clamp-1 ">
              {song.more_info.artistMap.artists.map((x) => x.name).join(", ")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-8  ">
          <SaveItemHeart songs={song} showHeart={true} />
          {currentSong.id !== song.id && (
            <Trash
              className=" cursor-pointer stroke-red-400  "
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeQueueSong(song.id);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
