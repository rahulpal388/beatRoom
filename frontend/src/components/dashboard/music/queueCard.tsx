
import { Play, Trash2 } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { TSong } from "./music";


export function QueueCards({ name, artist, image, setQueueSongs }: {
    name: string,
    artist: string,
    image: string,
    setQueueSongs: Dispatch<SetStateAction<TSong[]>>
}) {

    return <>
        <div className="  flex items-center justify-between  rounded-lg py-1 px-2 font-body  dark:bg-accent-foreground/50 dark:hover:bg-accent-foreground dark:shadow-2xl ">

            <div className="flex items-center gap-2">

                <Image src={image} alt="image" height={30} width={30} />
                <div>
                    <h1 className="text-md ">{name}</h1>
                    <p className=" text-xs  dark:text-neutral-600 ">{artist}</p>
                </div>
            </div>
            <div className=" ">
                <Trash2 className=" stroke-destructive cursor-pointer " onClick={() => {
                    setQueueSongs(prev => prev.filter(x => x.name != name))
                }} />
            </div>


        </div>
    </>

}