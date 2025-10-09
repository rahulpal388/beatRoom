import { MoveLeft } from "lucide-react";
import { Music } from "./music";
import { Dispatch, SetStateAction } from "react";
import { ISong } from "@/types/searchedSongType";
import { IAlbumSongs } from "@/types/albumType";
import { ITrendingSong } from "@/types/trendingSongType";
import Image from "next/image";
import { SongsSection } from "./songCard";


export function SearchedMusic({ setSongSuggestion, song, album, trending }: {
    setSongSuggestion: Dispatch<SetStateAction<boolean>>,
    song: ISong | undefined,
    album: IAlbumSongs | undefined,
    trending: ITrendingSong | undefined

}) {

    console.log(song?.image[2].url)
    return (
        <div>
            <div className="  " >
                <MoveLeft className="size-8 cursor-pointer "
                    onClick={() => setSongSuggestion(false)}
                />
            </div>
            <div className=" mt-10 px-8 flex   gap-6   ">
                <div>
                    <Image src={song?.image[2].url || ""} alt="image" height={200} width={200} />
                </div>
                <div className=" relative " >
                    <h1 className=" text-3xl " >{song!.name}</h1>
                    <p className=" text-sm " >by {song?.artists.primary.map(x => x.name).join(", ")}</p>
                    <div className=" flex gap-4 ">
                        <span>{song?.type}</span>
                        <span>{Math.floor(song!.duration / 60)}:{song!.duration % 60}</span>
                        <span>{song?.language}</span>
                    </div>
                    <button className="absolute bottom-1 rounded-lg px-4 py-2 bg-green-700 font-semibold ">Play</button>
                </div>
            </div>
            <div>

            </div>

        </div>
    )
}