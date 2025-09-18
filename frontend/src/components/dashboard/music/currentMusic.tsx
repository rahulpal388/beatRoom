import { FastForwardIcon, Pause, Play, SkipBack, SkipBackIcon, SkipForward } from "lucide-react";
import Image from "next/image";
import { useState } from "react";



export function CurrentMusic() {
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    return <>
        <div className="relative h-full  rounded overflow-hidden  ">
            <Image src={"https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg"} alt="image" height={100} width={100} className=" object-cover w-full h-full " />
            <div className=" absolute left-0 bottom-2   w-full   px-2  " >
                <div className=" backdrop-blur-sm py-2 px-2 rounded-md ">
                    <h1 className=" text-lg text-center ">Hamari Adhuri Kahani</h1>
                    <p className="text-center text-sm text-neutral-400   ">Arijit singh</p>
                    <input type="range" id="music" className="w-full     " />
                    <div className=" flex items-center justify-center gap-4 mt-px ">
                        <SkipBackIcon className=" cursor-pointer " />
                        {
                            isPlaying ?
                                <Pause className="cursor-pointer" onClick={() => { setIsPlaying(false) }} />
                                :
                                <Play className=" cursor-pointer " onClick={() => { setIsPlaying(true) }} />
                        }
                        <SkipForward className=" cursor-pointer " />
                    </div>
                </div>
            </div>
        </div>
    </>
}