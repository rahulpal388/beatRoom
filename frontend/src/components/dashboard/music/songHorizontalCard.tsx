"use client";
import { useQueue } from "@/context/queueContext";
import { decodeHTML } from "@/lib/decodeHtml";
import { getSong } from "@/lib/getSong";
import { CirclePlay } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SaveItemHeart } from "../saveItemHeart";
import { AddQueueIcon } from "../addQueueIcon";
import { getItemsToken } from "@/lib/getItemsToken";
import { useSongStore } from "@/store/songStore";

export function SongHorizontalCard({
  serialNumber,
  songId,
}: {
  serialNumber: number;
  songId: string;
}) {
  const songs = useSongStore((s) => s.songs[songId]);
  console.log(songs?.perma_url)
  const song_token = getItemsToken(songs?.perma_url || "");
  const album_token = getItemsToken(songs?.more_info?.album_url || "");
  const { addQueueAndSetCurrent } = useQueue();


  return (
    <div className=" group hover:bg-card-hover px-4 max-sm:px-6 py-2 rounded flex gap-4 items-center  ">
      <div className=" relative ">
        <p className=" group-hover:opacity-0 ">{serialNumber}</p>
        <CirclePlay
          className=" absolute top-0 -right-2 cursor-pointer  opacity-0 group-hover:opacity-100 "
          onClick={async () => {
            const song = await getSong(songs);
            addQueueAndSetCurrent(song);
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
      <div className=" flex items-center sm:justify-between flex-1 max-sm:pr-4 gap-px ">
        <div className=" xl:min-w-[40rem] md:min-w[32rem] min-w-[14rem]     flex xl:gap-12 xl:items-center max-xl:flex-col  ">
          <Link
            href={`/song/${song_token}/${album_token}`}
            className=" md:w-[16rem] w-[8rem] text-text-heading font-heading text-[1rem] truncate "
          >
            {decodeHTML(songs.title)}
          </Link>

          <p className="  md:w-[20rem] w-[8rem] truncate text-[0.7rem] text-text-muted ">
            {songs.more_info.artistMap.artists.map((x) => x.name).join(", ")}
          </p>
        </div>
        <div className=" flex items-center md:gap-12 gap-8 ">
          <SaveItemHeart songs={songs} showHeart={true} />
          <p className=" max-sm:hidden ">
            {Math.floor(Number(songs.more_info.duration) / 60)}:
            {String(Number(songs.more_info.duration) % 60).padStart(2, "0")}
          </p>
          <AddQueueIcon songs={songs} />
        </div>
      </div>
    </div>
  );
}
