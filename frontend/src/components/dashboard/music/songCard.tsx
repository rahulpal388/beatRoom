import { EllipsisVerticalIcon, Heart, Play } from "lucide-react";
import Image from "next/image";
import React, { ReactHTMLElement, useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/lib/baseUrl";
import { decodeHTML } from "@/lib/decodeHtml";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useQueue } from "@/context/queueContext";
import { useCurrentSongDetail } from "@/context/currentSong";
import { usePopoverCard } from "@/context/popover";
import { getSong } from "@/lib/getSong";
import { PlayBotton } from "@/ui/play";
import { useActiveCardPopover } from "@/context/activeCardPopover";
import { ISong } from "@/types/songType";
import { IPlaylist } from "@/types/playlistType";
import { IAlbums } from "@/types/albumType";

// task : url for the playlist

export function SongCards({
  title,
  artist,
  image,
  type,
  song_url,
  album_url,
  id,
}: // songs,
{
  title: string;
  artist: string;
  id: string;
  type: string;
  image: string;
  song_url: string;
  album_url: string;
  // songs: ISong | IPlaylist | IAlbums;
}) {
  const { setQueueSongs } = useQueue();
  const { isActive, setIsActive } = useActiveCardPopover();
  const song_token = song_url?.split("/").at(-1);
  const album_token = album_url?.split("/").at(-1);
  const songHref = `/dashboard/song/${song_token}/${album_token}`;
  const ablbumHref = `/dashboard/album/${album_token}`;
  const playlistHref = `/dashboard/playlist/${song_token}`;

  const { setIsPlaying, setCurrentSong } = useCurrentSongDetail();
  const { popoverRef, setCardType, setOpenPopover, openPopover } =
    usePopoverCard();
  const popoverElement = useRef<SVGSVGElement | null>(null);
  const activeCard = isActive === id;
  return (
    <>
      <div className=" relative shadow-soft   group px-4 py-4 h-[16rem] w-[10rem] rounded hover:bg-card-hover   ">
        <div
          className={`absolute top-4 px-4  left-1 z-20 items-center justify-between w-full ${
            openPopover && activeCard ? "flex" : "hidden  group-hover:flex"
          } `}
        >
          <Heart size={30} className="  cursor-pointer " />
          <div className="relative  ">
            <EllipsisVerticalIcon
              // ref={(el) => (popoverElement.current = el)}
              size={30}
              className=" cursor-pointer rounded-full    "
              onClick={(e) => {
                e.stopPropagation();
                setOpenPopover(!openPopover);
                popoverRef.current = e.currentTarget;
                setIsActive(id);
                setCardType(type);
              }}
              onScroll={() => {
                console.log("scrolling");
              }}
            />
          </div>
        </div>
        <div className="  mb-2  w-32 rounded     ">
          <Image
            src={image}
            alt="image"
            height={100}
            width={100}
            className="w-full h-full  group-hover:opacity-30 "
          />

          <PlayBotton
            className=" absolute top-[6.2rem] right-[1.2rem]  opacity-0 group-hover:opacity-100 "
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

        <Link
          href={
            type === "song"
              ? songHref
              : type === "album"
              ? ablbumHref
              : playlistHref
          }
          className="  text-[18px] text-text-heading line-clamp-2 leading-[1.4rem] "
        >
          {decodeHTML(title)}
        </Link>

        <p className="  mt-1 text-[0.7rem] text-text-muted line-clamp-2  ">
          {artist}
        </p>
      </div>
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
  const ref = useRef<HTMLDivElement | null>(null);
  const { containerRef } = usePopoverCard();

  useEffect(() => {
    containerRef.current = ref.current;
  }, [containerRef]);

  return (
    <>
      <div className=" rounded-lg w-[99%]  px-4 py-2 shadow-soft bg-card  border  border-transparent   ">
        <h1 className=" text-xl text-text-heading font-semibold font-heading ">
          {heading}
        </h1>
        <div
          ref={ref}
          className="mt-4   grid grid-flow-col max-sm:grid-rows-2 gap-4  overflow-x-auto  "
        >
          {children}
        </div>
      </div>
    </>
  );
}
