"use client";

import { LikedArtist } from "@/components/dashboard/music/likedArtist";

export default function MyLibraryArtist() {
  return (
    <>
      <div>
        <div className=" flex items-center justify-center h-24 border-b-[1px] border-primary/30 ">
          <h1 className=" text-xl font-medium  ">My Artist Library</h1>
        </div>
        <div>
          <LikedArtist />
        </div>
      </div>
    </>
  );
}
