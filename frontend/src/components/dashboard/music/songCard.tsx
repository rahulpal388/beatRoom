import { Play } from "lucide-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { TSong } from "./music";
import { TCurrentSong } from "@/app/dashboard/[userId]/page";
import axios from "axios";
import { BASE_URL } from "@/lib/baseUrl";
import { decodeHTML } from "@/lib/decodeHtml";

export function SongCards({
  song,
  artist,
  image,
  id,
  url,
  setQueueSongs,
  setCurrentSong,
  setIsPlaying,
}: {
  song: string;
  artist: string;
  image: string;
  id: string;
  url: string;
  setQueueSongs: Dispatch<SetStateAction<TSong[]>>;
  setCurrentSong: React.Dispatch<React.SetStateAction<TCurrentSong>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const getSong = async () => {
    console.log(id);
    const response = await axios.get(`${BASE_URL}/song/play/${id}`);
    if (response.status === 200) {
      console.log(id);
      console.log(response.data);
      const data = response.data;
      setCurrentSong({
        id,
        title: song,
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
          {decodeHTML(song)}
        </h1>
        <p className=" text-xs dark:text-neutral-600 line-clamp-2 ">{artist}</p>
      </div>
    </>
  );
}

export function SongsSection({
  setQueueSongs,
  heading,
  songs,
  setCurrentSong,
  setIsPlaying,
}: {
  setQueueSongs: Dispatch<SetStateAction<TSong[]>>;
  heading: string;
  songs: TSong[] | undefined;
  setCurrentSong: React.Dispatch<React.SetStateAction<TCurrentSong>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className=" rounded-lg  px-4 py-2  dark:shadow-2xl  ">
        <h1 className=" text-xl font-bold font-heading ">{heading}</h1>
        {!songs ? (
          <div className=" flex items-center justify-center   ">
            <div className="w-14 h-14 border-2 border-t-blue-800  border-gray-200 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="mt-2 w-full flex items-center gap-4 justify-between  overflow-x-auto overflow-y-hidden ">
            {songs.map((item, index) => (
              <SongCards
                key={index}
                id={item.id}
                song={item.title}
                artist={item.artist}
                image={item.image}
                url={item.url}
                setQueueSongs={setQueueSongs}
                setCurrentSong={setCurrentSong}
                setIsPlaying={setIsPlaying}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
