import { Play } from "lucide-react";
import Image from "next/image";
import React from "react";
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
      <div className=" shadow-lg border border-transparent dark:hover:bg-bar  px-4 py-4   h-[15rem] w-[10rem] rounded ">
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
        <h1 className=" fond-bold text-lg text-secondary-foreground line-clamp-2 ">
          {decodeHTML(title)}
        </h1>
        <p className=" text-xs dark:text-muted/60 line-clamp-2 ">{artist}</p>
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
      <div className=" rounded-lg w-[99%]  px-4 py-2 dark:shadow-2xl bg-card border  border-transparent   ">
        <h1 className=" text-xl font-bold font-heading ">{heading}</h1>
        <div className="mt-2   flex items-center gap-4 justify-between  overflow-x-auto ">
          {children}
        </div>
      </div>
    </>
  );
}
