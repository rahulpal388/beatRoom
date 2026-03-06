import { saveSong } from "@/api/song/saveSong";
import { useMusicPlayer } from "@/context/musicPlayerContext";
import { useToastNotification } from "@/context/toastNotificationContext";
import { decodeHTML } from "@/lib/decodeHtml";
import { useQueueStore } from "@/store/queueStore";
import { useSongStore } from "@/store/songStore";
import { Ellipsis, Grip, Heart, X } from "lucide-react";
import Image from "next/image";
import { SaveItemHeart } from "../saveItemHeart";

export function QueueCards({ id }: { id: string }) {
  const { toastMessage } = useToastNotification();
  const removeQueueSong = useQueueStore((s) => s.actions.removeQueueSong);
  const currentSongId = useQueueStore((s) => s.queueSong[s.currentIdx]);
  const currentSong = useSongStore((s) => s.songs[currentSongId]);
  const song = useSongStore((s) => s.songs[id]);
  const likeSong = useSongStore((s) => s.actions.likeSong);
  const { isPlaying } = useMusicPlayer();
  return (
    <>
      <div className="  flex items-center  justify-between gap-4  hover:bg-card-hover rounded-lg py-1 px-2 font-body    shadow-md group ">
        <div className="flex items-center gap-2   ">
          {currentSong.id !== song.id && (
            <Grip
              className=" cursor-grab max-w-[30px]  max-h-[30px]   "
              size={60}
            />
          )}
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
          {currentSong.id !== song.id && (
            <div className=" size-[25px] ">
              <X
                className=" h-full w-full cursor-pointer stroke-[1px] group-hover:block hidden "
                onClick={() => {
                  removeQueueSong(song.id);
                }}
              />
            </div>
          )}
          <SaveItemHeart songs={song} showHeart={true} />

          <Ellipsis className=" cursor-pointer " />
        </div>
      </div>
    </>
  );
}
