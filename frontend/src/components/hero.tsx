"use client";

import { MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

import Image from "next/image";
import { TextTransition } from "./animation/textTransition";

export function Hero() {
  const router = useRouter();
  const [isJoinRoom, setJoinRoom] = useState<boolean>(false);

  return (
    <>
      <div className=" mt-44  w-full text-center flex flex-col items-center  gap-6   ">
        <Image
          src="./rectanglePattern2.svg"
          alt="Pattern"
          fill
          className="object-cover -z-20 "
          priority
        />
        <div className="max-w-[55rem] ">
          <TextTransition />
          <h4 className="mt-6   md:text-3xl xm:text-2xl text-xl   font-medium font-body text-center text-neutral-600 ">
            BeatRoom lets you listen to music, watch videos, and hang out with
            friends in real-time with chat, voice, and video.
          </h4>

          <div className="flex items-center gap-20 justify-center mt-16 ">
            <div>
              <button
                className="flex gap-2 bg-secondary-btn-background border-[0.5px] border-secondary-btn-border text-secondary-btn-text px-4 py-2 rounded-lg cursor-pointer hover:text-secondary-btn-hover   "
                onClick={() => {
                  setJoinRoom(true);
                }}
              >
                <span>Join Room</span>
              </button>
            </div>
            <div>
              <button
                className="bg-red-800 sm:px-4 px-2 py-2 rounded-lg cursor-pointer "
                onClick={() => {
                  router.push("signup");
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* <div className=" col-span-4 relative flex items-center justify-center ">
                <Image src="playing-song.svg" alt="image" width="200" height="200" className="absolute  top-4 -rotate-12 right-56 " />
                <Image src="playing-song.svg" alt="image" width="200" height="200" className="relative  z-20 inset-0" />
                <Image src="playing-song.svg" alt="image" width="200" height="200" className="absolute  top-4 rotate-12 left-56 " />
            </div> */}
      </div>
    </>
  );
}
