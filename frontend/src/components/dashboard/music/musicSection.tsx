"use client"
import Image from "next/image";
import { QueueCards } from "./queueCard";
import { Copy, Play, Search, SkipBack, SkipForward, ToggleLeft, ToggleRight } from "lucide-react";
import { SongCards } from "./song";
import { MusicBanner } from "./musicBanner";
import { CurrentMusic } from "./currentMusic";
import { ArtistPlaylist, artistPlaylist } from "./artistPlaylist";
import { useEffect, useRef, useState } from "react";
import { p } from "motion/react-client";
import axios from "axios";
import { BASE_URL } from "@/lib/baseUrl";
import { Debounce } from "@/lib/debounce";
import { Music } from "./music";
import { SearchedMusic } from "./searchedMusic";

export type TQueueSong = {
    name: string,
    artist: string,
    image: string
}

export type TSearchSuggestion = {
    id: string,
    title: string,
    artists: string,
    image: string
}

// const searchSuggestion: TSearchSuggestion[] = [
//     {
//         "id": "K8GXHF5k",
//         "title": "Dhun",
//         "artists": "Mithoon, Arijit Singh",
//         "image": "https://c.saavncdn.com/598/Saiyaara-Hindi-2025-20250703061754-50x50.jpg"
//     },
//     {
//         "id": "U9amhr5-",
//         "title": "Dhundhala",
//         "artists": "Yashraj, Dropped Out, Talwiinder",
//         "image": "https://c.saavncdn.com/598/Saiyaara-Hindi-2025-20250703061754-50x50.jpg"
//     },
//     {
//         "id": "bfG8irJT",
//         "title": "Dhun",
//         "artists": "Mithoon, Arijit Singh",
//         "image": "https://c.saavncdn.com/598/Saiyaara-Hindi-2025-20250703061754-50x50.jpg"
//     }
// ]


export const playlistItems: TQueueSong[] = [
    {
        "name": "Blinding Lights",
        "artist": "The Weeknd",
        "image": "https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg"
    },
    {
        "name": "Shape of You",
        "artist": "Ed Sheeran",
        "image": "https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg"
    },
    {
        "name": "Levitating",
        "artist": "Dua Lipa",
        "image": "https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg"
    },
    {
        "name": "Believer",
        "artist": "Imagine Dragons",
        "image": "https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg"
    },
    {
        "name": "Stay",
        "artist": "The Kid LAROI, Justin Bieber",
        "image": "https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg"
    },
    {
        "name": "Bad Guy",
        "artist": "Billie Eilish",
        "image": "https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg"
    },
    {
        "name": "Someone You Loved",
        "artist": "Lewis Capaldi",
        "image": "https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg"
    },
    {
        "name": "Happier",
        "artist": "Marshmello, Bastille",
        "image": "https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg"
    }
]



export function MusicSection() {
    const [sideQueue, setSideQueue] = useState<boolean>(false);
    const [queueSongs, setQueueSongs] = useState<TQueueSong[]>([]);
    const [searchSuggestion, setSearchSuggestion] = useState<TSearchSuggestion[]>([]);
    const [isQueueOn, setIsQueueOn] = useState<boolean>(false);
    const musciSectionRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<HTMLVideoElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);


    const searchSuggestionFn = async (searchSuggestion: string) => {
        // reguest to the api for search suggestion

        try {
            const response = (await axios.get(`${BASE_URL}/song/suggestions?search=${searchSuggestion}`)).data;
            const data = response.results
            console.log(data)
            setSearchSuggestion([...data])

        } catch (error) {
            throw new Error("search suggestion error")
        }
    }

    const onSearchInputChange = Debounce(searchSuggestionFn, 1000);

    useEffect(() => {
        if (sideQueue && musciSectionRef.current) {
            musciSectionRef.current.classList.remove("overflow-y-auto")
            musciSectionRef.current.classList.add("overflow-hidden");

        } else {
            musciSectionRef.current?.classList.remove("overflow-hidden")
            musciSectionRef.current?.classList.add("overflow-y-auto")
        }
    }, [sideQueue])

    return <>

        <div className=" h-full grid grid-cols-8 overflow-hidden   ">
            <div ref={musciSectionRef} className=" overflow-y-auto  col-span-6 max-xl:col-span-8  pt-4 flex flex-col gap-4  pb-36 ">
                <div className="fixed  bottom-0 flex items-center  sm:gap-18 gap-6  z-50 py-2 px-8 w-full dark:bg-accent-foreground shadow-2xl rounded  xl:hidden ">
                    <div className=" flex items-center gap-2 ">
                        <Image src={"https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg"} alt="poster" height={30} width={30} className=" h-full w-16 rounded " />
                        <div>
                            <h1 className=" text-lg ">Beliver</h1>
                            <p className=" text-xs text-neutral-600 ">Imagine Dragons</p>
                        </div>
                    </div>
                    <div className=" flex max-lg:flex-col justify-center items-center  lg:gap-10 gap-2 ">
                        <div className="flex  gap-4 items-center ">
                            <SkipBack />
                            <Play />
                            <SkipForward />
                        </div>
                        <div>
                            <input type="range" name="" id="progress" className=" sm:w-64 w-40 " />
                        </div>
                    </div>

                </div>
                {
                    sideQueue &&
                    <div className="absolute top-30 right-0 bottom-0 z-30 h-[calc(100%-9rem)] px-4 dark:bg-foreground xl:hidden ">
                        <div className=" mt-4 flex flex-col gap-2 h-full  overflow-y-auto ">
                            <h1 className=" text-lg fond-bold font-heading ">Song Queue</h1>
                            {queueSongs.map((item, index) => (
                                <QueueCards key={index} name={item.name} artist={item.artist} image={item.image} setQueueSongs={setQueueSongs} />
                            ))}

                        </div>
                    </div>
                }

                {/* search bar and invite friends */}
                <div className=" flex flex-col gap-4 px-4  ">
                    <div className=" relative flex items-center gap-4 justify-end   ">
                        <div className=" rounded-sm overflow-hidden flex gap-2 justify-center items-center bg-accent-foreground ">
                            <input ref={inputRef} type="text" id="search" placeholder="Search songs....." className=" w-[18rem] bg-accent-foreground outline-none shadow-2xl px-2 h-8 " autoComplete="off" onChange={(e) => {
                                // 1.  call the debounce function
                                console.log("calling the suggestion function")
                                if (e.currentTarget.value) {
                                    onSearchInputChange(e.currentTarget.value);
                                }
                            }} />
                            <Search className=" w-12 cursor-pointer " />
                            {
                                searchSuggestion.length > 0 && inputRef.current?.value !== "" &&
                                <div className=" absolute top-10 z-50 w-[21.5rem] p-2 flex flex-col gap-2 rounded-sm dark:bg-neutral-700  " >
                                    {searchSuggestion.map((item, index) => (
                                        <div key={index} className=" cursor-pointer px-4 py-2 rounded-sm dark:hover:bg-accent-foreground  group  flex items-center justify-between " >
                                            <div>
                                                <h1 className="text-lg ">{item.title}</h1>
                                                <p className=" text-xs dark:group-hover:text-neutral-500 dark:text-neutral-400 " >{item.artists}</p>
                                            </div>
                                            <Image src={item.image} alt="image" height={50} width={50} className="rounded-sm " />
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                        <button className=" cursor-pointer dark:shadow-xl dark:bg-accent-foreground/50 dark:hover:bg-accent-foreground px-4 py-2 rounded text-muted flex gap-2 items-center ">
                            Invite friends
                            <Copy />
                        </button>
                        <button className=" cursor-pointer dark:shadow-xl dark:bg-accent-foreground/50 dark:hover:bg-accent-foreground px-4 py-2 rounded text-muted xl:hidden "
                            onClick={() => {
                                setSideQueue(prev => prev = !prev)

                            }}
                        >Queue Songs</button>
                    </div>



                    {/*  music section display  */}
                    {
                        isQueueOn ?
                            <Music setQueueSongs={setQueueSongs} recommended={playlistItems} type="notSearched" />
                            :
                            <SearchedMusic setQueueSongs={setQueueSongs} />
                    }
                </div>
            </div>


            {/* current playing music and playlist */}
            <div className="mt-4 col-span-2 px-2 py-4  h-full   dark:shadow-2xl  rounded dark:bg-foreground max-xl:hidden " >
                {/* muisc playing */}
                <video ref={playerRef} src={"https://aac.saavncdn.com/015/50758ec6f8e38922c56e6e473091490f_320.mp4"} className=" h-0 w-0" />
                <div className="xl:h-[14rem] h-[18rem]  row-span-2 rounded-lg  w-full ">
                    <CurrentMusic playerRef={playerRef} />
                </div>
                <div className="  mt-12 h-[calc(100vh-3rem-14rem)]  ">
                    <div className=" flex items-center justify-between  ">
                        <h1 className=" text-lg fond-bold font-heading ">Song Queue</h1>
                        {
                            isQueueOn ?
                                <ToggleRight
                                    className=" size-8 cursor-pointer stroke-green-700 "
                                    onClick={() => setIsQueueOn(false)}
                                />
                                :
                                <ToggleLeft
                                    className=" size-8 cursor-pointer stroke-red-700  "
                                    onClick={() => setIsQueueOn(true)}
                                />
                        }
                    </div>
                    {
                        queueSongs.length === 0 ?
                            <div className=" mt-20 text-center dark:text-neutral-600 ">
                                {
                                    isQueueOn ?
                                        "No Queue Songs"
                                        :
                                        "Queue is OFF"

                                }
                            </div>

                            :
                            <div className=" mt-4 flex flex-col gap-2 h-full  overflow-y-auto ">
                                {queueSongs.map((item, index) => (
                                    <QueueCards key={index} name={item.name} artist={item.artist} image={item.image} setQueueSongs={setQueueSongs} />
                                ))}

                            </div>
                    }
                </div>
            </div>
        </div>
    </>

}