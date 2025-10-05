import { Play } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { TSong } from "./music";



export function SongCards({ song, artist, image, setQueueSongs }: {
    song: string,
    artist: string,
    image: string,
    setQueueSongs: Dispatch<SetStateAction<TSong[]>>
}) {


    return <>
        <div className="hover:shadow-2xl dark:text-card dark:bg-accent-foreground/50 dark:hover:bg-accent-foreground  px-4 py-4  h-[15rem] rounded ">
            <div className=" mb-2 relative w-32 rounded overflow-hidden group cursor-pointer ">
                <Image src={image} alt="image" height={100} width={100} className="w-full h-full  " />
                <div className=" absolute bottom-2 right-2  bg-green-800 size-10 rounded-full hidden group-hover:flex items-center justify-center  "
                    onClick={() => { setQueueSongs(prev => [...prev, { name: song, artist: artist, image: image }]) }}
                >
                    <Play />
                </div>
            </div >
            <h1 className=" fond-bold text-neutral-200  ">{song}</h1>
            <p className=" text-xs dark:text-neutral-600  ">{artist}</p>
        </div>
    </>
}


export function SongsSection({ setQueueSongs, heading, songs }: {
    setQueueSongs: Dispatch<SetStateAction<TSong[]>>,
    heading: string,
    songs: TSong[] | undefined,

}) {

    return <>
        <div className=" rounded-lg  px-4 py-2  dark:shadow-2xl  ">
            <h1 className=" text-xl font-bold font-heading ">{heading}</h1>
            {!songs ?
                <div className=" flex items-center justify-center   ">
                    <div className="w-14 h-14 border-2 border-t-blue-800  border-gray-200 rounded-full animate-spin"></div>
                </div>
                :
                <div className="mt-2 w-full flex items-center gap-4 justify-between  overflow-x-auto overflow-y-hidden ">
                    {
                        songs.map((item, index) => (
                            <SongCards key={index} song={item.name} artist={item.artist} image={item.image} setQueueSongs={setQueueSongs} />
                        ))
                    }
                </div>
            }

        </div>
    </>
}


