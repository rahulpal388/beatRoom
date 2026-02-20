import { EllipsisVerticalIcon, Heart, Play } from "lucide-react";
import Image from "next/image";
import React, {
  Dispatch,
  ReactHTMLElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { api } from "@/lib/checkEnv";

import { decodeHTML } from "@/lib/decodeHtml";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useQueue } from "@/context/queueContext";
import { usePopoverCard } from "@/context/popover";
import { getSong } from "@/lib/getSong";
import { PlayBotton } from "@/ui/play";
import { useActiveCardPopover } from "@/context/activeCardPopover";
import { ISong } from "@/types/songType";
import { IPlaylist } from "@/types/playlistType";
import { saveSong } from "@/lib/save/saveSong";
import { IAlbum } from "@/types/albumType";
import { useToastNotification } from "@/context/toastNotificationContext";

export function SongCards({
  songs,
  updateState,
}: {
  songs: ISong | IPlaylist | IAlbum;
  updateState: (id: string) => void;
}) {
  const { isActive, setIsActive } = useActiveCardPopover();
  const song_token = songs.perma_url.split("/").at(-1);
  const album_token =
    songs.type === "song" && "album_url" in songs.more_info
      ? songs.more_info.album_url.split("/").at(-1)
      : "";
  const songHref = `/dashboard/song/${song_token}/${album_token}`;
  const ablbumHref = `/dashboard/album/${song_token}`;
  const playlistHref = `/dashboard/playlist/${song_token}`;
  const type = songs.type;
  const { popoverRef, setCardType, setOpenPopover, openPopover } =
    usePopoverCard();
  const { addQueueAndSetCurrent } = useQueue();
  const { success, error } = useToastNotification();
  const activeCard = isActive === songs.id;
  return (
    <>
      <div
        className={`relative shadow-soft   group px-4 py-4 h-[16rem] w-[10rem] rounded  hover:bg-card-hover`}
      >
        <div
          className={`absolute top-4 px-4  left-1 z-20 items-center justify-between w-full  flex`}
        >
          <Heart
            size={30}
            className={`cursor-pointer  ${songs.isLiked
              ? "fill-red-800 stroke-0 block "
              : ` ${openPopover && activeCard
                ? "block"
                : "hidden group-hover:block"
              }`
              } `}
            onClick={async () => {
              try {
                await axios.post(
                  `${api}/${songs.type}/${songs.isLiked ? "remove" : "save"
                  }`,
                  { ...songs, isLiked: !songs.isLiked },
                  { withCredentials: true }
                );
                success(`${songs.type} ${songs.isLiked ? "Removed" : "Saved"}`);
                updateState(songs.id);
              } catch (e) {
                error(`${songs.type} Not Saved`);
              }
            }}
          />
          <div
            className={`relative ${openPopover && activeCard ? "block" : "hidden group-hover:block"
              } `}
          >
            <EllipsisVerticalIcon
              size={30}
              className=" cursor-pointer rounded-full    "
              onClick={(e) => {
                e.stopPropagation();
                setOpenPopover(isActive ? !openPopover : false);
                popoverRef.current = e.currentTarget;
                setIsActive(songs.id);
                setCardType(songs.type);
              }}
            />
          </div>
        </div>
        <div className="  mb-2  w-32 rounded     ">
          <Image
            src={songs.image}
            alt="image"
            height={100}
            width={100}
            className="w-full h-full  group-hover:opacity-30 "
          />

          <PlayBotton
            className=" absolute top-[6.2rem] right-[1.2rem]  opacity-0 group-hover:opacity-100 "
            onClick={async () => {
              const song = await getSong({
                song_token,
                songId: songs.id,
                album_token,
                type,
              })
              addQueueAndSetCurrent(
                song
              );
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
          {decodeHTML(songs.title)}
        </Link>

        <p className="  mt-1 text-[0.7rem] text-text-muted line-clamp-2  ">
          {decodeHTML(
            songs.type === "playlist"
              ? songs.subtitle
              : songs.more_info.artistMap.artists.map((x) => x.name).join(", ")
          )}
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
