"use client";
import { LikedAlbum } from "@/components/dashboard/music/likedAlbum";
import { LikedArtist } from "@/components/dashboard/music/likedArtist";
import { LikedPlaylist } from "@/components/dashboard/music/likedPlaylist";
import { LikedSong } from "@/components/dashboard/music/likedSong";
import { useAuth } from "@/context/authContext";
import { useState } from "react";

export default function LikePage() {
  const [active, setActive] = useState<
    "song" | "album" | "playlist" | "artist"
  >("song");
  const { isAuthenticated } = useAuth();

  return (
    <>
      <div className="  py-8 md:px-12 px-4">
        <h1 className=" text-4xl ">Liked Music</h1>
        <div>
          <ul className=" flex items-center gap-12   mt-8  border-b-[1px] border-primary/20 ">
            <li
              className={`text-lg font-light h-8 pb-2 cursor-pointer ${
                active === "song"
                  ? "border-b-2 border-primary "
                  : "hover:border-b-2 hover:border-primary "
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
                  ? "border-b-2 border-primary "
                  : "hover:border-b-2 hover:border-primary "
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
                  ? "border-b-2 border-primary "
                  : "hover:border-b-2 hover:border-primary "
              }  `}
              onClick={async () => {
                setActive("playlist");
              }}
            >
              Playlist
            </li>
            <li
              className={`text-lg font-light h-8 pb-2 cursor-pointer ${
                active === "artist"
                  ? "border-b-2 border-primary "
                  : "hover:border-b-2 hover:border-primary "
              }  `}
              onClick={async () => {
                setActive("artist");
              }}
            >
              Artist
            </li>
          </ul>
        </div>
        <div className=" lg:pb-24 pb-28  ">
          {isAuthenticated ? (
            <div>
              {active === "song" && <LikedSong />}
              {active === "playlist" && <LikedPlaylist />}
              {active === "album" && <LikedAlbum />}
              {active === "artist" && <LikedArtist />}
            </div>
          ) : (
            <div className=" flex items-center justify-around py-[4rem]  text-lg">
              Login to see liked {active} !
            </div>
          )}
        </div>
      </div>
    </>
  );
}
