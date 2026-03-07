"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { SongCards } from "@/components/dashboard/music/songCard";
import { INewReleaseSong } from "@/types/songType";
import { IPlaylist } from "@/types/playlistType";
import { IAlbum } from "@/types/albumType";
import { putNewReleaseSongStore } from "@/lib/putNewReleaseSongStore";
import { usePlaylistStore } from "@/store/playlistStore";
import { useAlbumStore } from "@/store/albumStore";
import { SongCardContaier } from "./music/songCardContainer";

const browseList = [
  {
    title: "New Release",
    link: "/new-release",
  },
  {
    title: "Top Playlist",
    link: "/top-playlist",
  },
  {
    title: "Top Album",
    link: "/top-album",
  },
  {
    title: "Top Artists",
    link: "/top-artists",
  },
];

export default function BrowseComponent({
  newReleased,
  topAlbum,
  topPlaylist,
}: {
  newReleased: INewReleaseSong[];
  topPlaylist: IPlaylist[];
  topAlbum: IAlbum[];
}) {
  const [isDropDown, setIsDropDowm] = useState(false);
  const addTopPlaylist = usePlaylistStore((s) => s.actions.addTopPlaylist);
  const addTopAlbum = useAlbumStore((s) => s.actions.addTopAlbum);
  useEffect(() => {
    putNewReleaseSongStore(newReleased);
    addTopPlaylist(topPlaylist);
    addTopAlbum(topAlbum);
  }, []);

  return (
    <>
      <div className=" py-6 px-8 max-sm:px-4 pb-[9rem] ">
        <div className=" mt-8 max-lg:hidden  flex w-full  items-center justify-center ">
          <p className=" font-semibold text-xl  ">Mobile Only Page</p>
        </div>

        <div className="relative lg:hidden h-screen overflow-y-scroll ">
          <button
            className=" w-full h-10  px-4 flex  justify-between items-center rounded-sm border-[1.2px]  hover:border-primary border-netural-200 cursor-pointer "
            onClick={() => {
              setIsDropDowm(!isDropDown);
            }}
          >
            <p>Browse</p>

            {isDropDown ? <ChevronUp /> : <ChevronDown />}
          </button>
          <div className="absolute top-12 w-full z-40 ">
            <AnimatePresence>
              {isDropDown && (
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: 150,
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  className=" bg-card shadow-2xl w-full h-full  py-4 overflow-hidden "
                >
                  <ul className="flex flex-col">
                    {browseList.map((list, idx) => (
                      <Link
                        href={list.link}
                        key={idx}
                        className=" active:bg-primary hover:bg-white px-4 h-8 flex items-center "
                      >
                        <li>{list.title}</li>
                      </Link>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <div className="  mt-4 ">
              <h1 className=" text-lg font-semibold ">New Release</h1>
              <SongCardContaier>
                {newReleased.map((items) => (
                  <SongCards
                    key={items.id}
                    type={items.type}
                    id={items.id}
                    className="w-full"
                  />
                ))}
              </SongCardContaier>
            </div>
            <div className="  mt-4 ">
              <h1 className=" text-lg font-semibold ">Top Playlist</h1>
              <SongCardContaier>
                {topPlaylist.map((items) => (
                  <SongCards
                    key={items.id}
                    type={items.type}
                    id={items.id}
                    className="w-full"
                  />
                ))}
              </SongCardContaier>
            </div>
            <div className="  mt-4 ">
              <h1 className=" text-lg font-semibold ">Top Album</h1>
              <SongCardContaier>
                {topAlbum.map((items) => (
                  <SongCards
                    key={items.id}
                    type={items.type}
                    id={items.id}
                    className="w-full"
                  />
                ))}
              </SongCardContaier>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
