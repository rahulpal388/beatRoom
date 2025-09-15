
import { Play } from "lucide-react";
import Image from "next/image";


export function PlaylistCards({ name, artist, image }: {
    name: string,
    artist: string,
    image: string
}) {

    return <>
        <div className="  flex items-center justify-between hover:bg-[oklch(32%_0.04_280)] rounded-lg py-1 px-2 font-body  shadow-[0_4px_12px_oklch(12%_0.005_286.19_/_0.5)] ">
            <div className="flex items-center gap-2">

                <Image src={image} alt="image" height={30} width={30} />
                <div>
                    <h1 className="text-md ">{name}</h1>
                    <p className=" text-xs ">{artist}</p>
                </div>
            </div>
            <div>
                <Play />
            </div>
        </div>
    </>

}