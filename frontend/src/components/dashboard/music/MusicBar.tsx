import { SkipBack, SkipForward, Play } from "lucide-react";
import Image from "next/image";

export function MusicBar() {
  return (
    <>
      <div className=" h-16 fixed  bottom-0 flex items-center  sm:gap-18 gap-6  z-50 py-2 px-8 w-full dark:bg-bar shadow-2xl rounded  ">
        {/* small screen current player */}
        <div className=" flex items-center gap-2 ">
          <Image
            src={
              "https://c.saavncdn.com/740/De-De-Pyaar-De-2-Hindi-2025-20251107141020-500x500.jpg"
            }
            alt="poster"
            height={50}
            width={50}
            className="  rounded "
          />
          <div>
            <h1 className=" text-lg ">Beliver</h1>
            <p className=" text-xs text-neutral-600 ">Imagine Dragons</p>
          </div>
        </div>
        <div className=" flex max-lg:flex-col justify-center items-center  lg:gap-10 gap-2 ">
          <div className="flex  gap-4 items-center ">
            <SkipBack />
            <Play />
            <SkipForward />
          </div>
          <div>
            <input
              type="range"
              name=""
              id="progress"
              className=" sm:w-64 w-40 "
            />
          </div>
        </div>
      </div>
    </>
  );
}
