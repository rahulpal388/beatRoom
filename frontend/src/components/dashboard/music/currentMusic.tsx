import { FastForwardIcon, Paperclip, Pause, Play, SkipBack, SkipBackIcon, SkipForward } from "lucide-react";
import Image from "next/image";
import { RefObject, useEffect, useRef, useState } from "react";



export function CurrentMusic({ playerRef }: {
    playerRef: RefObject<HTMLVideoElement | null>
}) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [progressValue, setProgressValue] = useState<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);



    useEffect(() => {

        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                // change the progressbar
                const player = playerRef.current;
                if (!player) {
                    return;
                }
                const progress = ((player.currentTime / player.duration) * 100)
                setProgressValue(progress);
                if (progress === 100) {
                    setIsPlaying(false)
                    setProgressValue(0)
                }
            }, 1000)
        }

        if (!isPlaying && intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

    }, [isPlaying])



    return <>
        <div className="relative h-full  rounded overflow-hidden  ">
            <Image src={"https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg"} alt="image" height={100} width={100} className=" object-cover w-full h-full " />
            <div className=" absolute left-0 bottom-2   w-full   px-2  " >
                <div className=" backdrop-blur-sm py-2 px-2 rounded-md ">
                    <h1 className=" text-lg text-center ">Hamari Adhuri Kahani</h1>
                    <p className="text-center text-sm text-neutral-400   ">Arijit singh</p>
                    <input type="range" id="music" className=" cursor-pointer w-full " value={progressValue} onChange={(e) => {

                        setProgressValue(Number(e.currentTarget.value));
                        console.log(e.currentTarget.value)
                        if (playerRef.current) {
                            const time = (Number(e.currentTarget.value) * playerRef.current.duration) / 100;

                            playerRef.current.currentTime = time;
                        }
                    }} />
                    <div className=" flex items-center justify-center gap-4 mt-px ">
                        <SkipBackIcon className=" cursor-pointer " />
                        {
                            isPlaying ?
                                <Pause className="cursor-pointer" onClick={() => {
                                    playerRef.current?.pause();
                                    setIsPlaying(false)
                                }} />
                                :
                                <Play className=" cursor-pointer " onClick={() => {
                                    playerRef.current?.play();
                                    setIsPlaying(true)
                                }} />
                        }
                        <SkipForward className=" cursor-pointer " />
                    </div>
                </div>
            </div>
        </div>
    </>
}