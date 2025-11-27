"use client";
import { useCurrentSongDetail } from "@/context/currentSong";
import { formateTime, formateTimePading } from "@/lib/formateTime";
import { Button } from "@/ui/button";
import {
  SkipBack,
  SkipForward,
  Play,
  Heart,
  ListMusic,
  Maximize2,
  Ellipsis,
  Minimize2,
  Pause,
} from "lucide-react";
import { AnimatePresence, motion, Reorder } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { QueueCards } from "./queueCard";
import { decodeHTML } from "@/lib/decodeHtml";
import { useQueue } from "@/context/queueContext";

export function MusicBar() {
  const { currentSong, isPlaying, setIsPlaying, progressValue, playerRef } =
    useCurrentSongDetail();
  const [open, setOpen] = useState<boolean>(false);
  const parent = {
    initial: {
      height: 0,
    },
    animate: {
      height: "100%",
    },
    exit: {
      height: 0,
    },
  };

  const child = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <>
      <div>
        <AnimatePresence>
          {open && (
            <motion.div
              variants={parent}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: 0.5,
                delayChildren: 0.1,
                ease: "easeInOut",
              }}
              className=" absolute bottom-18 z-50 bg-bar w-full h-full  flex max-sm:flex-col items-center sm:justify-between md:px-36  px-4 md:gap-12 gap-4 pt-20 overflow-hidden  "
            >
              <motion.div
                variants={child}
                className=" flex flex-col items-center md:gap-4 gap-2 "
              >
                <Image
                  src={currentSong.image}
                  alt="image"
                  height={100}
                  width={100}
                  className=" md:h-[16rem] md:w-[16rem] w-36 h-36  "
                />
                <div>
                  <h1 className=" md:text-3xl text-2xl text-center line-clamp-1  ">
                    {decodeHTML(currentSong.title)}
                  </h1>
                  <p className=" md:text-md text-xs font-light line-clamp-1 ">
                    {currentSong.more_info.artistMap.artists
                      .map((x) => x.name)
                      .join(", ")}
                  </p>
                </div>
              </motion.div>
              <motion.div variants={child} className=" w-[28rem] bg-red-600 ">
                <h1>Queue Songs</h1>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="  h-18 absolute  lg:bottom-0 bottom-12   sm:gap-18 gap-6  z-50  w-full bg-bar  shadow-2xl    ">
          <div
            className=" w-full h-2  cursor-pointer   flex items-center "
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const progress = ((e.clientX - rect.left) / rect.width) * 100;
              const player = playerRef.current;
              if (player) {
                player.currentTime = (progress * player.duration) / 100;
              }
            }}
          >
            <div
              className="bg-green-400  h-1   "
              style={{
                width: `${progressValue}%`,
              }}
            ></div>
          </div>
          <div className=" flex items-center justify-between gap-4 py-2 px-8 max-md:px-4 ">
            <motion.div
              initial={{
                y: 0,
                opacity: 1,
              }}
              animate={{
                y: open ? -100 : 0,
                opacity: open ? 0 : 1,
              }}
              transition={{
                duration: 0.1,
              }}
              className=" flex items-center gap-4  "
            >
              <Image
                src={currentSong.image}
                alt="poster"
                height={50}
                width={50}
                className="  rounded "
              />
              <div className="  max-w-[24rem] ">
                <h1 className=" text-lg line-clamp-1 ">
                  {decodeHTML(currentSong.title)}
                </h1>
                <p className=" text-xs text-neutral-600 line-clamp-1 ">
                  {currentSong.more_info.artistMap.artists
                    .map((x) => x.name)
                    .join(", ")}
                </p>
              </div>
            </motion.div>
            <div className="flex  gap-4 items-center ">
              <SkipBack
                size={30}
                className=" stroke-1 max-sm:size-6 cursor-pointer "
              />
              {isPlaying ? (
                <Pause
                  size={30}
                  className=" stroke-1 cursor-pointer max-sm:size-6 "
                  onClick={() => {
                    setIsPlaying(false);
                  }}
                />
              ) : (
                <Play
                  size={30}
                  className=" stroke-1 cursor-pointer max-sm:size-6 "
                  onClick={() => {
                    setIsPlaying(true);
                  }}
                />
              )}

              <SkipForward
                size={30}
                className=" stroke-1  max-sm:size-6 cursor-pointer"
              />
            </div>
            <div className=" flex items-center gap-8  ">
              <p className="w-24 max-sm:hidden ">
                {playerRef.current
                  ? `${formateTimePading(
                      Math.trunc(playerRef.current.currentTime)
                    )} / ${formateTime(
                      `${Math.round(playerRef.current.duration)}`
                    )}`
                  : "00 / 00"}
              </p>
              <Heart size={30} className=" stroke-1 max-md:hidden " />
              <ViewQueueSongs />
              <Options />
              {open ? (
                <Minimize2
                  size={30}
                  className=" stroke-1 cursor-pointer max-sm:size-6 "
                  onClick={() => {
                    setOpen(false);
                  }}
                />
              ) : (
                <Maximize2
                  size={30}
                  className=" stroke-1 cursor-pointer max-sm:size-6 "
                  onClick={() => {
                    setOpen(true);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ViewQueueSongs() {
  const [queueOpen, setQueueOpen] = useState<boolean>(false);
  const { queueSongs, setQueueSongs, currentIdx } = useQueue();
  const { currentSong } = useCurrentSongDetail();

  return (
    <>
      <div>
        <AnimatePresence>
          {queueOpen && (
            <motion.div
              initial={{
                height: 0,
              }}
              animate={{
                height: "24rem",
              }}
              exit={{
                height: 0,
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className=" px-4 h-[24rem] w-[24rem] bg-card shadow-2xl  fixed   bottom-30 lg:bottom-20  right-4 lg:right-[4rem] max-md:hidden overflow-hidden rounded-xl "
            >
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0,
                  ease: "easeInOut",
                }}
              >
                <div className=" flex items-center justify-between px-4 py-2 ">
                  <div>
                    <h1 className=" text-2xl   ">Queue</h1>
                  </div>
                  <div className=" flex items-center gap-4  ">
                    <Button type="button" name="Save" btnType="Primary" />
                    <Button type="button" name="Cancel" btnType="Secondary" />
                  </div>
                </div>
                {currentSong && (
                  <QueueCards
                    name={currentSong.title}
                    key={currentSong.id}
                    artist={currentSong.more_info.artistMap.artists
                      .map((x) => x.name)
                      .join(", ")}
                    image={currentSong.image}
                  />
                )}
                <div>
                  <Reorder.Group
                    axis="y"
                    values={queueSongs}
                    onReorder={setQueueSongs}
                    className=" overflow-y-auto h-[20rem]   flex flex-col gap-4 py-2 "
                  >
                    {queueSongs
                      .filter((x) => x.id != currentSong.id)
                      .map((song) => (
                        <Reorder.Item key={song.id} value={song}>
                          <QueueCards
                            name={song.title}
                            artist={song.more_info.artistMap.artists
                              .map((x) => x.name)
                              .join(", ")}
                            image={song.image}
                          />
                        </Reorder.Item>
                      ))}
                  </Reorder.Group>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <ListMusic
          size={30}
          className=" stroke-1 max-md:hidden cursor-pointer "
          onClick={() => {
            setQueueOpen(!queueOpen);
          }}
        />
      </div>
    </>
  );
}
function Options() {
  const [optionOpen, setOptionOpen] = useState<boolean>(false);
  return (
    <>
      <div>
        {optionOpen && (
          <div className=" h-[24rem] w-[10rem] bg-bar  fixed   bottom-30 lg:bottom-18 right-4 lg:right-[2rem] max-md:hidden "></div>
        )}

        <Ellipsis
          size={30}
          className=" stroke-1 max-md:hidden cursor-pointer "
          onClick={() => {
            setOptionOpen((prev) => (prev = !prev));
          }}
        />
      </div>
    </>
  );
}
