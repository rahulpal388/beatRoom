
import { Play, Trash2 } from "lucide-react";
import Image from "next/image";


export function PlaylistCards({ name, artist, image }: {
    name: string,
    artist: string,
    image: string
}) {

    return <>
        <div className="  flex items-center justify-between  rounded-lg py-1 px-2 font-body  dark:bg-accent-foreground/50 dark:hover:bg-accent-foreground dark:shadow-2xl ">
            <div className="flex items-center gap-2">

                <Image src={image} alt="image" height={30} width={30} />
                <div>
                    <h1 className="text-md ">{name}</h1>
                    <p className=" text-xs ">{artist}</p>
                </div>
            </div>
            <div className="flex gap-2 ">
                <Play className="  stroke-primary cursor-pointer " />
                <Trash2 className=" stroke-red-400/50 cursor-pointer " />
            </div>
        </div>
    </>

}