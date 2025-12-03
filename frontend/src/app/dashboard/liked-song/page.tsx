"use client";
import { SongCards, SongsSection } from "@/components/dashboard/music/songCard";
import { SongCardContaier } from "@/components/dashboard/music/songCardContainer";
import { BASE_URL } from "@/lib/baseUrl";
import { ISong } from "@/types/songType";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LikedSong() {
  const [active, setActive] = useState<"song" | "album" | "playlist">("song");
  const [song, setSong] = useState<ISong[]>([]);

  useEffect(() => {
    const fetchSaveSong = async () => {
      const response = await axios.get(`${BASE_URL}/song/saveSong`, {
        withCredentials: true,
      });
      setSong(response.data);
    };
    fetchSaveSong();
  }, []);

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
                const response = await axios.get(`${BASE_URL}/song/saveSong`, {
                  withCredentials: true,
                });
                setSong(response.data);
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
              onClick={() => {
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
              onClick={() => {
                setActive("playlist");
              }}
            >
              Playlist
            </li>
          </ul>
        </div>
        <div className="  ">
          {active === "song" &&
            (song.length === 0 ? (
              <div className=" py-[4rem] flex items-center justify-center  ">
                <h1 className=" text-lg ">Liked Song is empty!</h1>
              </div>
            ) : (
              <SongCardContaier>
                {song.map((song, idx) => (
                  <SongCards key={idx} songs={song} />
                ))}
              </SongCardContaier>
            ))}
        </div>
      </div>
    </>
  );
}
