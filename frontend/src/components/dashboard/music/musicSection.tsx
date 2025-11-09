"use client";
import { Copy } from "lucide-react";
import { CurrentMusic } from "./currentMusic";
import React from "react";
import { MusicBar } from "./MusicBar";
import { SongQueue } from "./songQueue";
import { SearchBar } from "./SearchBar";
import { DisplaySongs } from "./MusicPages/displaySongs";


export function MusicSection() {
  return (
    <>
      <div className=" h-full   grid grid-cols-8 overflow-hidden   ">
        <div
          className=" overflow-y-auto  col-span-6 max-xl:col-span-8  pt-4 flex flex-col gap-4  pb-36 "
        >
          <MusicBar />
          {/* search bar and invite friends */}
          <div className="  flex flex-col gap-4   ">
            <DisplaySongs />
          </div>
        </div>

        {/* current playing music and playlist */}
        <div className="mt-4 col-span-2 px-2 py-4  h-full   dark:shadow-2xl  rounded dark:bg-foreground max-xl:hidden ">
          <div className="xl:h-[14rem] h-[18rem]  row-span-2 rounded-lg  w-full ">
            <CurrentMusic />
          </div>
          <div className="  mt-12 h-[calc(100vh-3rem-14rem)]  "></div>
          <SongQueue />
        </div>
      </div>
    </>
  );
}
