"use client";
import { LikedPlaylist } from "@/components/dashboard/music/likedPlaylist";

export default function MyLibraryPlaylist() {
  return (
    <>
      <div>
        <div className=" flex items-center justify-center h-24 border-b-[1px] border-primary/30 ">
          <h1 className=" text-xl font-medium  ">My Playlist Library</h1>
        </div>
        <div>
          <LikedPlaylist />
        </div>
      </div>
    </>
  );
}
