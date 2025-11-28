"use client";
import { useCurrentSongDetail } from "@/context/currentSong";
import { formateTime, formateTimePading } from "@/lib/formateTime";
import {
  SkipBack,
  SkipForward,
  Play,
  Heart,
  ListMusic,
  Maximize2,
  Minimize2,
  Pause,
} from "lucide-react";
import { AnimatePresence, motion, Reorder } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { decodeHTML } from "@/lib/decodeHtml";
import { QueueSongs } from "./queueSongs";
import { MusicBarPopover } from "./musicBarPopover";

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
              className="bg-card absolute bottom-18 z-50 bg-bar w-full h-full  flex max-sm:flex-col max-sm:pb-20 items-center sm:justify-between lg:px-36  px-4 md:gap-12 gap-4 pt-20 overflow-y-auto   "
            >
              <motion.div
                variants={child}
                className=" flex flex-col items-center  "
              >
                <Image
                  src={currentSong.image}
                  alt="image"
                  height={100}
                  width={100}
                  className=" md:mb-4 mb-2 rounded-lg md:h-[16rem] md:w-[16rem] w-36 h-36  "
                />

                <h1 className="font-heading   md:text-2xl text-xl text-center line-clamp-1  ">
                  {decodeHTML(currentSong.title)}
                </h1>
                <p className=" mt-px max-w-[12rem]  md:text-[0.9rem] text-text-muted  text-xs font-light line-clamp-1 ">
                  {currentSong.more_info.artistMap.artists
                    .map((x) => x.name)
                    .join(", ")}
                </p>
              </motion.div>
              <motion.div
                variants={child}
                className="  w-full  border-[0.5px] border-card-border rounded-2xl px-4 shadow-soft bg-card  "
              >
                <QueueSongs />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="  h-18 absolute  lg:bottom-0 bottom-12   sm:gap-18 gap-6  z-50  w-full bg-card border-t-[1px] border-card-border  shadow-soft   ">
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
                <h1 className=" text-text-heading font-heading text-lg line-clamp-1 ">
                  {decodeHTML(currentSong.title)}
                </h1>
                <p className=" text-[0.7rem] text-text-muted line-clamp-1 ">
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
            <div className=" flex items-center sm:gap-8  ">
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
              <MusicBarPopover />
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
              className=" px-2 h-[24rem] w-[24rem] bg-card shadow-2xl  fixed   bottom-30 lg:bottom-20  right-4 lg:right-[4rem] max-md:hidden overflow-hidden rounded-xl
               "
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
                <QueueSongs />
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
