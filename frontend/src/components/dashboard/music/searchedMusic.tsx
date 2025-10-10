import { MoveLeft } from "lucide-react";
import { Music, TSong } from "./music";
import { Dispatch, SetStateAction } from "react";
import { ISong } from "@/types/searchedSongType";
import { IAlbumSongs } from "@/types/albumType";
import { ITrendingSong } from "@/types/trendingSongType";
import Image from "next/image";
import { SongsSection } from "./songCard";
import { ZCOOL_KuaiLe } from "next/font/google";
import { TCurrentSong } from "@/app/dashboard/[userId]/page";
import { decodeHTML } from "@/lib/decodeHtml";


export function SearchedMusic({ setQueueSongs, setSongSuggestion, song, album, trending, setCurrentSong, setIsPlaying }: {
    setQueueSongs: Dispatch<SetStateAction<TSong[]>>,
    setSongSuggestion: Dispatch<SetStateAction<boolean>>,
    song: ISong | undefined,
    album: IAlbumSongs | undefined,
    trending: ITrendingSong[] | undefined,
    setCurrentSong: React.Dispatch<React.SetStateAction<TCurrentSong>>,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>

}) {

    console.log(song?.image[2].url)
    return (
        <div>
            <div className="  " >
                <MoveLeft className="size-8 cursor-pointer "
                    onClick={() => setSongSuggestion(false)}
                />
            </div>
            {
                !song ?
                    <div className="flex justify-center items-center mt-10  ">
                        <div className=" size-14 border-2 border-t-blue-700 border-gray-400 rounded-full animate-spin  "></div>
                    </div>
                    :
                    <div className=" mt-10 px-8 flex   gap-6   ">
                        <div>
                            <Image src={song?.image[2].url || ""} alt="image" height={200} width={200} />
                        </div>
                        <div className=" relative " >
                            <h1 className=" text-3xl " >{decodeHTML(song.name)}</h1>
                            <p className=" text-sm " >by {song?.artists.primary.map(x => x.name).join(", ")}</p>
                            <div className=" flex gap-4 ">
                                <span>{song?.type}</span>
                                <span>{Math.floor(song!.duration / 60)}:{song?.duration % 60}</span>
                                <span>{song?.language}</span>
                            </div>
                            <button className="absolute bottom-1 rounded-lg px-4 py-2 bg-green-700 font-semibold ">Play</button>
                        </div>
                    </div>
            }
            {
                !album ?
                    <div className=" flex items-center justify-center mt-10 ">
                        <div className=" size-14 broder-2 border-t-blue-700 border-gray-400 rounded-full animate-spin " ></div>
                    </div>
                    :
                    <div className="mt-6">
                        <SongsSection
                            setQueueSongs={setQueueSongs}
                            heading="Recommonded Songs"
                            songs={album.songs.map(x => {
                                return {
                                    id: x.id,
                                    title: x.name,
                                    type: x.type,
                                    duration: x.duration.toString(),
                                    image: x.image[2].url,
                                    artist: x.artists.primary.map(({ name }) => name).join(", ")
                                }
                            })}
                            setCurrentSong={setCurrentSong}
                            setIsPlaying={setIsPlaying}
                        />
                    </div>
            }
            {
                !trending ?
                    <div className=" flex items-center justify-center mt-10 ">
                        <div className=" size-14 broder-2 border-t-blue-700 border-gray-400 rounded-full animate-spin " ></div>
                    </div>

                    :
                    <div className="mt-6">
                        <SongsSection
                            setQueueSongs={setQueueSongs}
                            setCurrentSong={setCurrentSong}
                            setIsPlaying={setIsPlaying}
                            heading="Trending Songs"
                            songs={trending.map(x => {
                                return {
                                    id: x.id,
                                    title: x.title,
                                    type: x.type,
                                    image: x.image,
                                    duration: x.more_info.duration,
                                    artist: x.more_info.artistMap.primary_artists.map(({ name }) => name).join(", ")
                                }
                            })}

                        />
                    </div>
            }

        </div>
    )
}