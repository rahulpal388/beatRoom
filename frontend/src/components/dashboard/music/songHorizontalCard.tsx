import { decodeHTML } from "@/lib/decodeHtml";
import { EllipsisVertical, Heart } from "lucide-react";
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
}: {
  serialNumber: number;
  id: string;
  title: string;
  image: string;
  artist: string;
  duration: string;
  song_url: string;
  album_url: string;
}) {
  const param = useParams();
  const song_token = song_url.split("/").at(-1);
  const album_token = album_url.split("/").at(-1);
  return (
    <div className="  hover:bg-bar px-4 py-2 rounded flex gap-4 items-center ">
      <p>{serialNumber}</p>
      <div className=" flex items-center justify-between flex-1  ">
        <div className=" xl:min-w-[40rem] md:min-w[32rem] min-w-[20rem]   flex xl:gap-12 xl:items-center max-xl:flex-col ">
          <a
            href={`/dashboard/${param.userId}/song/${song_token}/${album_token}`}
            className=" w-[20rem] font-semibold text-md truncate "
          >
            {decodeHTML(title)}
          </a>

          <p className=" md:w-[20rem] w-12 truncate text-xs ">{artist}</p>
        </div>
        <Heart size={20} className="cursor-pointer" />
        <p>
          {Math.floor(Number(duration) / 60)}:{Number(duration) % 60}
        </p>
        <EllipsisVertical size={20} className="cursor-pointer" />
      </div>
    </div>
  );
}
