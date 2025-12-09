"use client";
import { LikedAlbum } from "@/components/dashboard/music/likedAlbum";
import { LikedPlaylist } from "@/components/dashboard/music/likedPlaylist";
import { LikedSong } from "@/components/dashboard/music/likedSong";
import { useState } from "react";

export default function LikePage() {
  const [active, setActive] = useState<"song" | "album" | "playlist">("song");

  return (
    <>
      <div className="  py-8 px-12 ">
        <h1 className=" text-4xl ">Liked Music</h1>
        <div>
          <ul className=" flex items-center gap-12   mt-8  border-b-[1px] border-neutral-100/10 ">
            <li
              className={`text-lg font-light h-8 pb-2 cursor-pointer ${
                active === "song"
                  ? "border-b-2 border-neutral-700/60 "
                  : "hover:border-b-2 hover:border-neutral-700/60 "
              }  `}
              onClick={async () => {
                setActive("song");
              }}
            >
              Song
            </li>
            <li
              className={`text-lg font-light h-8 pb-2 cursor-pointer ${
                active === "album"
                  ? "border-b-2 border-neutral-700/60 "
                  : "hover:border-b-2 hover:border-neutral-700/60 "
              }  `}
              onClick={async () => {
                setActive("album");
              }}
            >
              Album
            </li>
            <li
              className={`text-lg font-light h-8 pb-2 cursor-pointer ${
                active === "playlist"
                  ? "border-b-2 border-neutral-700/60 "
                  : "hover:border-b-2 hover:border-neutral-700/60 "
              }  `}
              onClick={async () => {
                setActive("playlist");
              }}
            >
              Playlist
            </li>
          </ul>
        </div>
        <div className=" lg:pb-24 pb-28 ">
          {active === "song" && <LikedSong />}
          {active === "playlist" && <LikedPlaylist />}
          {active === "album" && <LikedAlbum />}
        </div>
      </div>
    </>
  );
}
