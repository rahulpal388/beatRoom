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

// task : url for the playlist

export function SongCards({
  title,
  artist,
  image,
  type,
  song_url,
  album_url,
  id,
}: {
  title: string;
  artist: string;
  id: string;
  type: string;
  image: string;
  song_url: string;
  album_url: string;
}) {
  const { setQueueSongs } = useQueue();
  const param = useParams();
  const song_token = song_url?.split("/").at(-1);
  const album_token = album_url?.split("/").at(-1);
  const songHref = `/dashboard/${param.userId}/song/${song_token}/${album_token}`;
  const ablbumHref = `/dashboard/${param.userId}/album/${album_token}`;
  const playlistHref = `/dashboard/${param.userId}/playlist/${song_token}`;

  const { setIsPlaying, setCurrentSong } = useCurrentSongDetail();
  const { popoverRef, setCardType, setOpenPopover, openPopover } =
    usePopoverCard();
  const popoverElement = useRef<SVGSVGElement | null>(null);

  const getSong = async () => {
    if (type === "playlist") {
      const playlistSong = (
        await axios.get(`${BASE_URL}/playlist/${song_token}`)
      ).data;
      setQueueSongs(playlistSong.list);
      console.log(song_token);
      setCurrentSong(playlistSong.list[0]);
      console.log(playlistSong.list);
    } else {
      const albumSong = (
        await axios.get(
          `${BASE_URL}/album/?songToken=${song_token}&albumToken=${album_token}`
        )
      ).data;

      setQueueSongs(albumSong.list);
      setCurrentSong(albumSong.list[0]);
    }
    setIsPlaying(true);
  };

  return (
    <>
      <div className=" relative shadow-lg border border-transparent dark:hover:bg-bar  group px-4 py-4 h-[16rem] w-[10rem] rounded  ">
        <div className=" absolute top-px px-px left-0 z-20 flex items-center justify-between w-full  ">
          <Heart size={30} className="  cursor-pointer " />
          <div className="relative  ">
            <EllipsisVerticalIcon
              ref={popoverElement}
              size={30}
              className=" cursor-pointer rounded-full    "
              onClick={(e) => {
                e.stopPropagation();
                popoverRef.current = popoverElement.current;
                setCardType(type);
                setOpenPopover(!openPopover);
              }}
              onScroll={() => {
                console.log("scrolling");
              }}
            />
          </div>
        </div>
        <div className="  mb-2  w-32 rounded  group   ">
          <Image
            src={image}
            alt="image"
            height={100}
            width={100}
            className="w-full h-full  group-hover:opacity-70 "
          />
          <div
            className=" absolute bottom-2 right-2  cursor-pointer  bg-green-800 size-10 rounded-full hidden group-hover:flex items-center justify-center  "
            onClick={getSong}
          >
            <Play />
          </div>
        </div>

        <Link
          href={
            type === "song"
              ? songHref
              : type === "album"
              ? ablbumHref
              : playlistHref
          }
          className=" fond-bold text-[18px] text-secondary-foreground line-clamp-2 leading-6 "
        >
          {decodeHTML(title)}
        </Link>

        <p className=" mt-px text-[10px] dark:text-muted/60 line-clamp-2  ">
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
      <div className=" rounded-lg w-[99%]  px-4 py-2 dark:shadow-2xl bg-card border  border-transparent   ">
        <h1 className=" text-xl font-bold font-heading ">{heading}</h1>
        <div
          ref={ref}
          className="mt-4   flex items-center gap-4  overflow-x-auto  "
        >
          {children}
        </div>
      </div>
    </>
  );
}
