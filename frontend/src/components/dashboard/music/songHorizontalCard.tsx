import { useToastNotification } from "@/context/toastNotificationContext";
import { decodeHTML } from "@/lib/decodeHtml";
import { getSong } from "@/lib/getSong";
import { saveSong } from "@/lib/saveSong";
import { ISong } from "@/types/songType";
import { CirclePlay, EllipsisVertical, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SongHorizontalCard({
  serialNumber,
  songs,
  updateState,
}: {
  serialNumber: number;
  songs: ISong;
  updateState: (id: string) => void;
}) {
  const song_token = songs.perma_url.split("/").at(-1);
  const album_token = songs.more_info.album_url.split("/").at(-1);
  const { success, error } = useToastNotification();
  console.log("horizontal card");
  return (
    <div className=" group hover:bg-card-hover px-4 py-2 rounded flex gap-4 items-center ">
      <div className=" relative ">
        <p className=" group-hover:opacity-0 ">{serialNumber}</p>
        <CirclePlay
          className=" absolute top-0 -right-2 cursor-pointer  opacity-0 group-hover:opacity-100 "
          onClick={() => {
            getSong({
              song_token,
              album_token,
              songId: songs.id,
              type: songs.type,
            });
          }}
        />
      </div>
      <Image
        src={songs.image}
        alt="song"
        height={40}
        width={40}
        className=" rounded  "
      />
      <div className=" flex items-center justify-between flex-1  ">
        <div className=" xl:min-w-[40rem] md:min-w[32rem] min-w-[14rem]   flex xl:gap-12 xl:items-center max-xl:flex-col  ">
          <Link
            href={`/dashboard/song/${song_token}/${album_token}`}
            className=" md:w-[16rem] w-[10rem] text-text-heading font-heading text-[1rem] truncate "
          >
            {decodeHTML(songs.title)}
          </Link>

          <p className=" md:w-[20rem] w-[14rem] truncate text-[0.7rem] text-text-muted ">
            {songs.more_info.artistMap.artists.map((x) => x.name).join(", ")}
          </p>
        </div>
        <div className=" flex items-center gap-12 ">
          <Heart
            size={20}
            className={`cursor-pointer max-sm:hidden ${
              songs.isLiked ? "fill-red-700" : ""
            }`}
            onClick={async () => {
              const response = await saveSong(songs);
              if (!response) {
                error("Song Not Saved");
              } else {
                // song saved
                success(`Song ${songs.isLiked ? "Removed" : "Saved"}`);
                updateState(songs.id);
              }
            }}
          />
          <p className=" max-sm:hidden ">
            {Math.floor(Number(songs.more_info.duration) / 60)}:
            {Number(songs.more_info.duration) % 60}
          </p>
          <EllipsisVertical size={20} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
