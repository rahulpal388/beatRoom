import { EllipsisVerticalIcon, Heart, ListPlus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { decodeHTML } from "@/lib/decodeHtml";
import Link from "next/link";
import { useQueue } from "@/context/queueContext";
import { usePopoverCard } from "@/context/popover";
import { getSong } from "@/lib/getSong";
import { PlayBotton } from "@/ui/play";
import { INewReleaseSong, ISong } from "@/types/songType";
import { IPlaylist } from "@/types/playlistType";
import { IAlbum } from "@/types/albumType";
import { useToastNotification } from "@/context/toastNotificationContext";
import { IArtistAlbum } from "@/types/artistType";
import { getForwardPageUrl } from "../getForwardPageUrl";
import { saveEntity } from "@/api/saveEntity";
import { removeEntity } from "@/api/removeEntity";
import { SaveItemHeart } from "../saveItemHeart";
import { AddQueueIcon } from "../addQueueIcon";

export function SongCards({
  songs,
  updateState,
}: {
  songs: ISong | IPlaylist | IAlbum | IArtistAlbum | INewReleaseSong;
  updateState: (id: string) => void;
}) {
  const { addQueueAndSetCurrent } = useQueue();
  return (
    <>
      <div
        className={`relative shadow-xl    group px-4 py-4 md:h-[16rem] md:w-[10rem] sm:w-[16rem]
                    w-[10rem] rounded  hover:bg-card-hover`}
      >
        <div
          className={`absolute top-4 px-4  left-1 z-20 items-center justify-between w-full  flex`}
        >
          <SaveItemHeart
            songs={songs}
            showHeart={false}
            updateState={updateState}
          />
          <div className={`relative  hidden group-hover:block `}>
            <AddQueueIcon songs={songs} />
          </div>
        </div>
        <div className="  mb-2  w-full    ">
          <Image
            src={
              songs.image.length === 0 ? "/default_card_image.jpg" : songs.image
            }
            alt="image"
            height={100}
            width={100}
            className="w-full h-full group-hover:opacity-30 "
          />

          <PlayBotton
            className=" absolute top-[6.2rem] right-[1.2rem]  opacity-0 group-hover:opacity-100 "
            onClick={async () => {
              console.log(songs);
              const song = await getSong(songs);
              addQueueAndSetCurrent(song);
            }}
          />
        </div>

        <Link
          href={getForwardPageUrl(songs)}
          className="  text-[18px] text-text-heading line-clamp-2 leading-[1.4rem] "
        >
          {decodeHTML(songs.title)}
        </Link>

        <p className="  mt-1 text-[0.7rem] text-text-muted line-clamp-2  ">
          {decodeHTML(
            songs.type === "playlist"
              ? songs.subtitle
              : songs.type === "song"
                ? songs.more_info.artistMap.artists
                    .map((x) => x.name)
                    .join(", ")
                : "",
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
          className="mt-4   grid grid-flow-col max-sm:grid-rows-1 gap-4  overflow-x-auto  "
        >
          {children}
        </div>
      </div>
    </>
  );
}
