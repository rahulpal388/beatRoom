import { useMusicPlayer } from "@/context/musicPlayerContext";
import { useQueue } from "@/context/queueContext";
import { useToastNotification } from "@/context/toastNotificationContext";
import { decodeHTML } from "@/lib/decodeHtml";
import { saveSong } from "@/lib/save/saveSong";
import { ISong } from "@/types/songType";
import { Ellipsis, Grip, Heart, X } from "lucide-react";
import Image from "next/image";

export function QueueCards({
  song,
  updateState,
}: {
  song: ISong;
  updateState: (id: string) => void;
}) {
  const { success, error } = useToastNotification();
  const { currentSong, removeQueueSong } = useQueue();
  const { isPlaying } = useMusicPlayer();
  return (
    <>
      <div className="  flex items-center  justify-between gap-4  hover:bg-card-hover rounded-lg py-1 px-2 font-body    shadow-md group ">
        <div className="flex items-center gap-2   ">
          {
            currentSong.id !== song.id &&
            <Grip className=" cursor-grab max-w-[30px]  max-h-[30px]   " size={60} />
          }
          <Image
            src={currentSong.id !== song.id ? song.image : isPlaying ? "/MusicPlaying.gif" : song.image}
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
          {
            currentSong.id !== song.id && (
              <div className=" size-[25px] ">
                <X className=" h-full w-full cursor-pointer stroke-[1px] group-hover:block hidden "

                  onClick={() => { removeQueueSong(song.id) }}
                />
              </div>
            )
          }
          <Heart
            className={`cursor-pointer max-md:hidden  ${song.isLiked ? "fill-red-700 stroke-0 " : "stroke-[1.5px]"
              }`}
            onClick={async () => {
              const response = await saveSong(song);
              if (response) {
                success("Song Saved");
                updateState(song.id);
              } else {
                error("Song Not Saved");
              }
            }}
          />

          <Ellipsis className=" cursor-pointer " />
        </div>
      </div>
    </>
  );
}
