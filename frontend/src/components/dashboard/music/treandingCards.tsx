import { Play } from "lucide-react";
import Image from "next/image";



export function TrendingCards({ song, artist, image }: {
    song: string,
    artist: string,
    image: string
}) {


    return <>
        <div className="hover:shadow-2xl dark:text-card dark:bg-accent-foreground/50 dark:hover:bg-accent-foreground  px-4 py-4  h-[15rem] rounded ">
            <div className=" mb-2 relative w-32 rounded overflow-hidden group cursor-pointer ">
                <Image src={image} alt="image" height={100} width={100} className="w-full h-full  " />
                <div className=" absolute bottom-2 right-2 bg-green-800 size-10 rounded-full hidden group-hover:flex items-center justify-center  ">
                    <Play className=" " />
                </div>
            </div >
            <h1 className=" fond-bold text-neutral-200  ">{song}</h1>
            <p className=" text-xs dark:text-neutral-600  ">{artist}</p>
        </div>
    </>
}