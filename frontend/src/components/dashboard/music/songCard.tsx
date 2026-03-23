"use client";
import Image from "next/image";
import { decodeHTML } from "@/lib/decodeHtml";
import Link from "next/link";
import { PlayButton } from "@/ui/play";
import { getForwardPageUrl } from "../getForwardPageUrl";
import { SaveItemHeart } from "../saveItemHeart";
import { AddQueueIcon } from "../addQueueIcon";
import { useSongStore } from "@/store/songStore";
import { usePlaylistStore } from "@/store/playlistStore";
import { useAlbumStore } from "@/store/albumStore";
export function SongCards({
  type,
  id,
  className,
}: {
  type: "song" | "playlist" | "album" | "userPlaylist";
  id: string;
  className?: string;
}) {
  const song = useSongStore((s) => (type === "song" ? s.songs[id] : null));
  const playlist = usePlaylistStore((s) =>
    type === "playlist" || type === "userPlaylist" ? s.playlist[id] : null,
  );
  const album = useAlbumStore((s) => (type === "album" ? s.album[id] : null));
  const items = song || playlist || album;

  if (!items) {
    return null;
  }

  return (
    <>
      <Link
        href={getForwardPageUrl(items)}
        className={`relative    group px-4 py-4  w-full  rounded   ${className}`}
      >
        <div className="relative  mb-2  w-full     ">
          <Image
            src={
              items.image.length === 0 ? "/default_card_image.jpg" : items.image
            }
            alt="image"
            height={100}
            width={100}
            className="w-full h-full group-hover:opacity-30 rounded-lg "
          />
          <div
            className={`absolute top-2 px-2   z-20 items-center justify-between w-full  flex`}
          >
            <SaveItemHeart songs={items} showHeart={false} />
            <div className={`relative pr-2  hidden group-hover:block `}>
              <AddQueueIcon songs={items} />
            </div>
          </div>
          <div className=" hidden group-hover:block ">
            <PlayButton items={items} />
          </div>
        </div>

        <div className="  text-[16px] font-medium  text-text-heading dark:text-foreground line-clamp-2 leading-[1.4rem] ">
          {decodeHTML(items.title)}
        </div>
      </Link>
    </>
  );
}

export function SongsSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  if (Array.isArray(children) && children.length === 0) {
    return null;
  }

  return (
    <>
      <div className="  rounded-lg w-full  sm:px-4 py-2   ">
        <h1 className=" text-2xl text-text-heading font-semibold font-heading   ">
          {heading}
        </h1>
        <div className="mt-4 grid gap-4  lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2   overflow-hidden   ">
          {children}
        </div>
      </div>
    </>
  );
}
