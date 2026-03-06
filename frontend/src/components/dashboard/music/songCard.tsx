"use client";
import Image from "next/image";
import { decodeHTML } from "@/lib/decodeHtml";
import Link from "next/link";
import { getSong } from "@/lib/getSong";
import { PlayBotton } from "@/ui/play";
import { getForwardPageUrl } from "../getForwardPageUrl";
import { SaveItemHeart } from "../saveItemHeart";
import { AddQueueIcon } from "../addQueueIcon";
import { useSongStore } from "@/store/songStore";
import { usePlaylistStore } from "@/store/playlistStore";
import { useAlbumStore } from "@/store/albumStore";
import { useQueueStore } from "@/store/queueStore";

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
  const addQueueSongAndSetCurrent = useQueueStore(
    (s) => s.actions.addQueueSongAndSetCurrent,
  );
  const addSongs = useSongStore((s) => s.actions.addSongs);
  const items = song || playlist || album;

  if (!items) {
    return null;
  }

  return (
    <>
      <Link
        href={getForwardPageUrl(items)}
        className={`relative shadow-xl    group px-4 py-4 w-full  rounded  hover:bg-card-hover ${className}`}
      >
        <div
          className={`absolute top-4 px-4  left-1 z-20 items-center justify-between w-full  flex`}
        >
          <SaveItemHeart songs={items} showHeart={false} />
          <div className={`relative pr-2  hidden group-hover:block `}>
            <AddQueueIcon songs={items} />
          </div>
        </div>
        <div className="  mb-2  w-full    ">
          <Image
            src={
              items.image.length === 0 ? "/default_card_image.jpg" : items.image
            }
            alt="image"
            height={100}
            width={100}
            className="min-w-full min-h-full max-w-[8rem] max-h-[14rem] group-hover:opacity-30 "
          />

          <PlayBotton
            className=" absolute top-[7rem] md:top-[9rem] lg:top-[10rem] right-[1.2rem]   opacity-0 group-hover:opacity-100 "
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              const song = await getSong(items);
              addSongs(song);
              addQueueSongAndSetCurrent(song);
            }}
          />
        </div>

        <div className="  text-[18px] text-text-heading line-clamp-2 leading-[1.4rem] ">
          {decodeHTML(items.title)}

          <p className="  mt-1 text-[0.7rem] text-text-muted line-clamp-2  ">
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
