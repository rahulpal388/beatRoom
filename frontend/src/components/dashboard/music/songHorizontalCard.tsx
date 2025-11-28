import { useCurrentSongDetail } from "@/context/currentSong";
import { useQueue } from "@/context/queueContext";
import { decodeHTML } from "@/lib/decodeHtml";
import { getSong } from "@/lib/getSong";
import { PlayBotton } from "@/ui/play";
import { CirclePlay, EllipsisVertical, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export function SongHorizontalCard({
  serialNumber,
  id,
  title,
  image,
  artist,
  duration,
  song_url,
  album_url,
  type,
}: {
  serialNumber: number;
  id: string;
  title: string;
  image: string;
  artist: string;
  duration: string;
  song_url: string;
  album_url: string;
  type: string;
}) {
  const param = useParams();
  const song_token = song_url.split("/").at(-1);
  const album_token = album_url.split("/").at(-1);
  const { setCurrentSong, setIsPlaying } = useCurrentSongDetail();
  const { setQueueSongs } = useQueue();
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
              type,
              setIsPlaying,
              setCurrentSong,
              setQueueSongs,
            });
          }}
        />
      </div>
      <Image
        src={image}
        alt="song"
        height={40}
        width={40}
        className=" rounded  "
      />
      <div className=" flex items-center justify-between flex-1  ">
        <div className=" xl:min-w-[40rem] md:min-w[32rem] min-w-[14rem]   flex xl:gap-12 xl:items-center max-xl:flex-col  ">
          <Link
            href={`/dashboard/${param.userId}/song/${song_token}/${album_token}`}
            className=" md:w-[16rem] w-[10rem] text-text-heading font-heading text-[1rem] truncate "
          >
            {decodeHTML(title)}
          </Link>

          <p className=" md:w-[20rem] w-[14rem] truncate text-[0.7rem] text-text-muted ">
            {artist}
          </p>
        </div>
        <div className=" flex items-center gap-12 ">
          <Heart size={20} className="cursor-pointer max-sm:hidden " />
          <p className=" max-sm:hidden ">
            {Math.floor(Number(duration) / 60)}:{Number(duration) % 60}
          </p>
          <EllipsisVertical size={20} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
