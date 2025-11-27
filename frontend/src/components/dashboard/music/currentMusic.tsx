import { Pause, Play, SkipBackIcon, SkipForward } from "lucide-react";
import Image from "next/image";
import { RefObject } from "react";
import { decodeHTML } from "@/lib/decodeHtml";
import { useCurrentSongDetail } from "@/context/currentSong";

export function CurrentMusic() {
  const {
    currentSong,
    isPlaying,
    progressValue,
    setIsPlaying,
    setProgressValue,
    playerRef,
  } = useCurrentSongDetail();

  return (
    <>
      <div className="relative h-full  rounded overflow-hidden  ">
        <Image
          src={`${currentSong.image.url}`}
          alt="image"
          height={100}
          width={100}
          className=" object-cover w-full h-full "
        />
        <div className=" absolute left-0 bottom-2   w-full   px-2  ">
          <div className=" backdrop-blur-sm py-2 px-2 rounded-md ">
            <h1 className=" text-lg text-center line-clamp-2 ">
              {decodeHTML(currentSong.title)}
            </h1>
            <p className="text-center text-sm text-neutral-400 line-clamp-1   ">
              {currentSong.artist}
            </p>
            <input
              type="range"
              id="music"
              style={{
                background: `linear-gradient(to right, #22c55e ${progressValue}%, #3f3f46 ${progressValue}%)`,
              }}
              className=" w-full h-2 bg-neutral-600 rounded-lg appearance-none cursor-pointer "
              value={progressValue}
              onChange={(e) => {
                setProgressValue(Number(e.currentTarget.value));
                console.log(e.currentTarget.value);
                if (playerRef.current) {
                  const time =
                    (Number(e.currentTarget.value) *
                      playerRef.current.duration) /
                    100;

                  playerRef.current.currentTime = time;
                }
              }}
            />
            <div className=" flex items-center justify-center gap-4 mt-px ">
              <SkipBackIcon className=" cursor-pointer " />
              {isPlaying ? (
                <Pause
                  className="cursor-pointer"
                  onClick={() => {
                    playerRef.current?.pause();
                    setIsPlaying(false);
                  }}
                />
              ) : (
                <Play
                  className=" cursor-pointer "
                  onClick={() => {
                    playerRef.current?.play();
                    setIsPlaying(true);
                  }}
                />
              )}
              <SkipForward className=" cursor-pointer " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
