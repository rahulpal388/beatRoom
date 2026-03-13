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
import { useQueueStore } from "@/store/queueStore";
import { it } from "node:test";
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
        className={`relative shadow-xl   group px-4 py-4 w-[12rem]  rounded  hover:bg-card-hover ${className}`}
      >
        <div className="relative  mb-2  w-full     ">
          <Image
            src={
              items.image.length === 0 ? "/default_card_image.jpg" : items.image
            }
            alt="image"
            height={100}
            width={100}
            className="w-full h-full group-hover:opacity-30 "
          />
          <div
            className={`absolute top-2 px-2   z-20 items-center justify-between w-full  flex`}
          >
            <SaveItemHeart songs={items} showHeart={false} />
            <div className={`relative pr-2  hidden group-hover:block `}>
              <AddQueueIcon songs={items} />
            </div>
          </div>
          <PlayButton items={items} />
        </div>

        <div className="  text-[18px] text-text-heading dark:text-foreground line-clamp-2 leading-[1.4rem] ">
          {decodeHTML(items.title)}

          <p className="  mt-1 text-[0.7rem]  text-text-muted line-clamp-2  ">
            {decodeHTML(
              items.type === "playlist" || items.type === "userPlaylist"
                ? items.subtitle
                : items.type === "song"
                  ? items.more_info.artistMap.artists
                      .map((x) => x.name)
                      .join(", ")
                  : "",
            )}
          </p>
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
      <div className=" rounded-lg w-[99%]  px-4 py-2 shadow-soft bg-card  border  border-transparent   ">
        <h1 className=" text-xl text-text-heading font-semibold font-heading ">
          {heading}
        </h1>
        <div className="mt-4   grid grid-flow-col max-sm:grid-rows-1 gap-4  overflow-x-auto  ">
          {children}
        </div>
      </div>
    </>
  );
}
