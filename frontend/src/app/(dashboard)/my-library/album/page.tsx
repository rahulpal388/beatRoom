"use client";
import { LikedAlbum } from "@/components/dashboard/music/likedAlbum";

export default function MyLibraryAlbum() {
  return (
    <>
      <div>
        <div className=" flex items-center justify-center h-24 border-b-[1px] border-primary/30 ">
          <h1 className=" text-xl font-medium  ">My Library Album</h1>
        </div>
        <div>
          <LikedAlbum />
        </div>
      </div>
    </>
  );
}
