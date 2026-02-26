"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { SongCards } from "@/components/dashboard/music/songCard";
import { MoreSkeletonCard } from "@/ui/cardSkeleton";
import { INewReleaseSong } from "@/types/songType";
import { getNewReleasedSong } from "@/api/song/newReleasedSong";
import { IPlaylist } from "@/types/playlistType";
import { getTopPlaylist } from "@/api/playlist/getTopPlaylist";
import { IAlbum } from "@/types/albumType";
import { getTrendingAlbum } from "@/api/album/getTrendingAlbum";

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

export default function Browse() {
  const [isDropDown, setIsDropDowm] = useState(false);
  const [newReleased, setNewReleased] = useState<INewReleaseSong[]>([]);
  const [topPlaylist, setTopPlaylist] = useState<IPlaylist[]>([]);
  const [topAlbum, setTopAlbum] = useState<IAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      const [newReleaseResponse, topPlaylistResponse, album] =
        await Promise.all([
          getNewReleasedSong(8, 1),
          getTopPlaylist(8, 1),
          getTrendingAlbum(8, 1, "hindi"),
        ]);
      setNewReleased(newReleaseResponse);
      setTopPlaylist(topPlaylistResponse);
      setTopAlbum(album);
      setIsLoading(false);
    };

    fetchDetail();
  }, []);

  return (
    <>
      <div className=" py-6 px-8 max-sm:px-4  ">
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
                    {browseList.map((list) => (
                      <Link
                        href={list.link}
                        className=" hover:bg-white px-4 h-8 flex items-center "
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
              <div className=" flex gap-4 flex-wrap max-sm:gap-2 max-sm:gap-2 ">
                {isLoading ? (
                  <MoreSkeletonCard count={10} />
                ) : (
                  newReleased.map((items) => (
                    <SongCards
                      key={items.id}
                      songs={items}
                      updateState={(id: string) => {
                        setNewReleased((prev) =>
                          prev.map((x) =>
                            x.id === id ? { ...x, isLiked: !x.isLiked } : x,
                          ),
                        );
                      }}
                    />
                  ))
                )}
              </div>
            </div>
            <div className="  mt-4 ">
              <h1 className=" text-lg font-semibold ">Top Playlist</h1>
              <div className=" flex gap-4 flex-wrap max-sm:gap-2  ">
                {isLoading ? (
                  <MoreSkeletonCard count={10} />
                ) : (
                  topPlaylist.map((items) => (
                    <SongCards
                      key={items.id}
                      songs={items}
                      updateState={(id: string) => {
                        setNewReleased((prev) =>
                          prev.map((x) =>
                            x.id === id ? { ...x, isLiked: !x.isLiked } : x,
                          ),
                        );
                      }}
                    />
                  ))
                )}
              </div>
            </div>
            <div className="  mt-4 ">
              <h1 className=" text-lg font-semibold ">Top Album</h1>
              <div className=" flex gap-4 flex-wrap max-sm:gap-2  ">
                {isLoading ? (
                  <MoreSkeletonCard count={10} />
                ) : (
                  topAlbum.map((items) => (
                    <SongCards
                      key={items.id}
                      songs={items}
                      updateState={(id: string) => {
                        setNewReleased((prev) =>
                          prev.map((x) =>
                            x.id === id ? { ...x, isLiked: !x.isLiked } : x,
                          ),
                        );
                      }}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
