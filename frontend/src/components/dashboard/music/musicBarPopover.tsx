"use client";
import { useQueue } from "@/context/queueContext";
import { useToastNotification } from "@/context/toastNotificationContext";
import { BASE_URL } from "@/lib/baseUrl";
import axios from "axios";
import { ChevronLeft, ChevronRight, Ellipsis, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export function MusicBarPopover() {
  const [optionOpen, setOptionOpen] = useState<boolean>(false);
  const { currentSong } = useQueue();
  const songToken = currentSong.perma_url.split("/").at(-1);
  const albumToken = currentSong.more_info.album_url.split("/").at(-1);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(true);
  const { success, error } = useToastNotification();
  return (
    <>
      <div>
        <AnimatePresence>
          {optionOpen && (
            <motion.div
              initial={{
                height: 0,
              }}
              animate={{
                height: "",
              }}
              exit={{
                height: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
              className=" max-h-[24rem]  w-[12rem] py-4  bg-card   fixed   bottom-30 lg:bottom-18 right-4 lg:right-[2rem] max-md:hidden rounded-t-lg overflow-hidden "
            >
              <AnimatePresence mode="wait">
                {showPlaylist ? (
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className=" h-full  "
                  >
                    <div className=" flex flex-col   divide-y-[1px] divide-neutral-100/60  ">
                      <button
                        className="hover:bg-card-hover  cursor-pointer text-start  px-4 py-2 flex gap-2 items-center "
                        onClick={() => {
                          setShowPlaylist(false);
                        }}
                      >
                        <ChevronLeft size={20} />
                        Back
                      </button>
                      <button className=" flex gap-2 items-center hover:bg-card-hover   cursor-pointer text-start   px-4 py-2 ">
                        <Plus size={20} />
                        New Playlist
                      </button>
                    </div>
                    <div className=" py-4 border-t-[1px] border-neutral-100/60  overflow-y-auto h-[18rem] ">
                      <ul>
                        {Array(20)
                          .fill(0)
                          .map((items, idx) => (
                            <li
                              key={idx}
                              className="hover:bg-card-hover   cursor-pointer text-start   px-4 py-2 "
                              onClick={() => {
                                // save the song to the playlist
                                setOptionOpen(false);
                              }}
                            >
                              {idx + 1} Hieel
                            </li>
                          ))}
                      </ul>
                    </div>
                  </motion.div>
                ) : (
                  <motion.ul
                    key="option"
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className=" flex flex-col pb-4   w-full overflow-y-auto  "
                  >
                    <li>
                      <button
                        className="hover:bg-card-hover w-full cursor-pointer  text-start px-4 py-2 "
                        onClick={async () => {
                          const response = await axios
                            .post(
                              `${BASE_URL}/song/save`,
                              { ...currentSong, isLiked: true },
                              { withCredentials: true }
                            )
                            .then(() => {
                              setOptionOpen(false);
                              success("Song Saved");
                            })
                            .catch(() => {
                              error("Error");
                            });
                        }}
                      >
                        Save To Library
                      </button>
                    </li>
                    <li>
                      <button
                        className="hover:bg-card-hover w-full cursor-pointer  text-start px-4 py-2 flex justify-between items-center "
                        onClick={() => {
                          setShowPlaylist(true);
                        }}
                      >
                        Add To Playlist
                        <ChevronRight size={20} />
                      </button>
                    </li>
                    <li>
                      <Link
                        href={`/dashboard/song/${songToken}/${albumToken}`}
                        className=" w-full block hover:bg-card-hover   text-start px-4 py-2   "
                        onClick={() => {
                          setOptionOpen(false);
                        }}
                      >
                        Song Detail
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/dashboard/album/${albumToken}`}
                        className=" w-full block hover:bg-card-hover   text-start px-4 py-2   "
                        onClick={() => {
                          setOptionOpen(false);
                        }}
                      >
                        More from Album
                      </Link>
                    </li>
                    {currentSong.more_info.artistMap.artists
                      .filter((x) => x.role === "singer")
                      .map((artist, idx) => (
                        <li key={idx}>
                          <Link
                            href={`/dashboard/artist/${artist.perma_url
                              .split("/")
                              .at(-1)}`}
                            className=" w-full block hover:bg-card-hover   text-start px-4 py-2   "
                            onClick={() => {
                              setOptionOpen(false);
                            }}
                          >
                            More From {artist.name}
                          </Link>
                        </li>
                      ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
        <Ellipsis
          size={30}
          className=" stroke-1 max-md:hidden cursor-pointer "
          onClick={() => {
            setOptionOpen((prev) => (prev = !prev));
            setShowPlaylist(false);
          }}
        />
      </div>
    </>
  );
}
