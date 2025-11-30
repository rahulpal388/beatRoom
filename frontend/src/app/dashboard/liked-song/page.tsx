"use client";
import Link from "next/link";
import { useState } from "react";

export default function LikedSong() {
  const [active, setActive] = useState<"song" | "album" | "playlist">("song");
  return (
    <>
      <div className=" py-8 px-12 ">
        <h1 className=" text-4xl ">Liked Music</h1>
        <div>
          <ul className=" flex items-center gap-12   mt-8  border-b-[1px] border-neutral-100/10 ">
            <li
              className={`text-lg font-light h-8 pb-2 ${
                active === "song"
                  ? "border-b-2 border-neutral-700/60 "
                  : "hover:border-b-2 hover:border-neutral-700/60 "
              }  `}
              onClick={() => {
                setActive("song");
              }}
            >
              <Link href={""}>Song</Link>
            </li>
            <li
              className={`text-lg font-light h-8 pb-2 ${
                active === "album"
                  ? "border-b-2 border-neutral-700/60 "
                  : "hover:border-b-2 hover:border-neutral-700/60 "
              }  `}
              onClick={() => {
                setActive("album");
              }}
            >
              <Link href={""}>Album</Link>
            </li>
            <li
              className={`text-lg font-light h-8 pb-2 ${
                active === "playlist"
                  ? "border-b-2 border-neutral-700/60 "
                  : "hover:border-b-2 hover:border-neutral-700/60 "
              }  `}
              onClick={() => {
                setActive("playlist");
              }}
            >
              <Link href={""}>Playlist</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
