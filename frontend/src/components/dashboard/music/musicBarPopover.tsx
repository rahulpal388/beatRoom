"use client";
import { addSongToPlaylist } from "@/api/playlist/addSongToPlaylist";
import { getSavePlaylist } from "@/api/playlist/getSavePlaylist";
import { removeEntity } from "@/api/removeEntity";
import { saveEntity } from "@/api/saveEntity";
import { useModal } from "@/context/modalContext";
import { useQueue } from "@/context/queueContext";
import { useToastNotification } from "@/context/toastNotificationContext";
import { getItemsToken } from "@/lib/getItemsToken";

import { ChevronLeft, ChevronRight, Ellipsis, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export function MusicBarPopover() {
  const [optionOpen, setOptionOpen] = useState<boolean>(false);
  const { currentSong, isCurrentSong } = useQueue();
  const songToken = getItemsToken(currentSong ? currentSong.perma_url : "");
  const albumToken = getItemsToken(
    currentSong ? currentSong.more_info.album_url : "",
  );
  const [showPlaylist, setShowPlaylist] = useState<boolean>(true);
  const [playlistName, setPlaylistName] = useState<
    { title: string; id: string }[]
  >([]);
  const { toastMessage } = useToastNotification();
  const { updateQueue } = useQueue();
  const { showModal } = useModal();
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
              className=" max-h-[24rem] shadow-2xl border-[1px] border-primary/10   w-[12rem] py-4  bg-card   fixed   bottom-30 lg:bottom-18 right-4 lg:right-[2rem] max-md:hidden rounded-t-lg overflow-hidden "
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
                      <button
                        className=" flex gap-2 items-center hover:bg-card-hover   cursor-pointer text-start   px-4 py-2 "
                        onClick={() => {
                          setOptionOpen(false);
                          showModal("saveCurrent");
                        }}
                      >
                        <Plus size={20} />
                        New Playlist
                      </button>
                    </div>
                    <div className=" py-4 border-t-[1px] border-neutral-100/60  overflow-y-auto pb-12">
                      <ul>
                        {playlistName.map((items) => (
                          <li
                            key={items.id}
                            className="hover:bg-card-hover   cursor-pointer text-start   px-4 py-2 "
                            onClick={async () => {
                              const saveSong = await addSongToPlaylist(
                                items.id,
                                currentSong,
                              );
                              if (!saveSong) {
                                toastMessage({
                                  message: "Adding Song",
                                  type: "error",
                                });
                              } else {
                                toastMessage({
                                  message: "Song added",
                                  type: "success",
                                });
                                updateQueue(currentSong.id);
                              }
                              setOptionOpen(false);
                            }}
                          >
                            {items.title}
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
                          const { success, message } = currentSong.isLiked
                            ? await removeEntity(
                              currentSong.id,
                              currentSong.type,
                            )
                            : await saveEntity(currentSong.type, currentSong);
                          toastMessage({
                            message,
                            type: success ? "success" : "error",
                          });
                          if (success) {
                            updateQueue(currentSong.id);
                          }
                          setOptionOpen(false);
                        }}
                      >
                        {currentSong.isLiked
                          ? "Remove From Library"
                          : "Save To Library"}
                      </button>
                    </li>
                    <li>
                      <button
                        className="hover:bg-card-hover w-full cursor-pointer  text-start px-4 py-2 flex justify-between items-center "
                        onClick={async () => {
                          setShowPlaylist(true);
                          const playlists = await getSavePlaylist();
                          const titleAndId = playlists.map((x) => {
                            return { title: x.title, id: x.id };
                          });
                          setPlaylistName(titleAndId);
                        }}
                      >
                        Add To Playlist
                        <ChevronRight size={20} />
                      </button>
                    </li>
                    <li>
                      <Link
                        href={`/song/${songToken}/${albumToken}`}
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
                        href={`/album/${albumToken}`}
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
                            href={`/artist/${artist.perma_url
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
          className={`stroke-1 max-md:hidden ${isCurrentSong ? "cursor-pointer" : "cursor-not-allowed opacity-40"}`}
          onClick={() => {
            if (isCurrentSong) {
              setOptionOpen((prev) => (prev = !prev));
              setShowPlaylist(false);
            }
          }}
        />
      </div>
    </>
  );
}
