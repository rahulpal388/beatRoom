import { Play } from "lucide-react";
import Image from "next/image";



export function TrendingCards({ song, artist, image }: {
    song: string,
    artist: string,
    image: string
}) {


    return <>
        <div>
            <div className="relative size-32 rounded overflow-hidden group cursor-pointer ">
                <Image src={image} alt="image" height={100} width={100} className="w-full h-full  " />
                <div className=" absolute bottom-2 right-2 bg-green-800 size-10 rounded-full hidden group-hover:flex items-center justify-center  ">
                    <Play className=" " />
                </div>
            </div>
            <h1 className=" fond-bold text-neutral-200  ">{song}</h1>
            <p className=" text-xs text-neutral-600 ">{artist}</p>
        </div>
    </>
}