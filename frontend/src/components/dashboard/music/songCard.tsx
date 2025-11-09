import { Play } from "lucide-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { TSong } from "./MusicPages/music";
import { TCurrentSong } from "@/app/dashboard/[userId]/page";
import axios from "axios";
import { BASE_URL } from "@/lib/baseUrl";
import { decodeHTML } from "@/lib/decodeHtml";
import { useCurrentSongDetail } from "@/context/currentSong";

export function SongCards({
  title,
  artist,
  image,
  id
}: {
  title: string;
  artist: string;
  image: string;
  id: string
}) {
  const { setCurrentSong, setIsPlaying } = useCurrentSongDetail();
  const getSong = async () => {
    const response = await axios.get(`${BASE_URL}/song/play/${title}`);
    if (response.status === 200) {
      const data = response.data;
      setCurrentSong({
        id,
        title: title,
        artist,
        type: data.type,
        duration: data.duration,
        image: {
          quality: "500x500",
          url: image,
        },
        downloadUrl: {
          quality: "320kbps",
          url: data.downloadUrl,
        },
      });
      setIsPlaying(true);
    }
  };

  return (
    <>
      <div className="hover:shadow-2xl dark:text-card dark:bg-accent-foreground/50 dark:hover:bg-accent-foreground  px-4 py-4  h-[15rem] rounded ">
        <div className=" mb-2 relative w-32 rounded overflow-hidden group cursor-pointer ">
          <Image
            src={image}
            alt="image"
            height={100}
            width={100}
            className="w-full h-full  "
          />
          <div
            className=" absolute bottom-2 right-2  bg-green-800 size-10 rounded-full hidden group-hover:flex items-center justify-center  "
            onClick={getSong}
          >
            <Play />
          </div>
        </div>
        <h1 className=" fond-bold text-neutral-200 line-clamp-2 ">
          {decodeHTML(title)}
        </h1>
        <p className=" text-xs dark:text-neutral-600 line-clamp-2 ">{artist}</p>
      </div>
    </>
  );
}

export function SongsSection({ heading, children }: {
  heading: string;
  children: React.ReactNode
}) {
  return (
    <>
      <div className=" rounded-lg  px-4 py-2  dark:shadow-2xl  ">
        <h1 className=" text-xl font-bold font-heading ">{heading}</h1>
        <div className="mt-2 w-full flex items-center gap-4 justify-between  overflow-x-auto overflow-y-hidden ">
          {children}
        </div>
      </div>
    </>
  );
}
