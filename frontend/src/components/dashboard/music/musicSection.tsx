"use client"
import Image from "next/image";
import { QueueCards } from "./queueCard";
import { Copy, Play, Search, SkipBack, SkipForward, ToggleLeft, ToggleRight } from "lucide-react";
import { SongCards } from "./songCard";
import { MusicBanner } from "./musicBanner";
import { CurrentMusic } from "./currentMusic";
import { ArtistPlaylist, artistPlaylist } from "./artistPlaylist";
import React, { useEffect, useRef, useState } from "react";
import { p } from "motion/react-client";
import axios from "axios";
import { BASE_URL } from "@/lib/baseUrl";
import { Debounce } from "@/lib/debounce";
import { Music, TSong } from "./music";
import { SearchedMusic } from "./searchedMusic";
import { TCurrentSong } from "@/app/dashboard/[userId]/page";



type ISearchSong = {
    id: string,
    title: string,
    image: {
        quality: string,
        url: string
    },
    album: string,
    type: string,
    artist: string
}



export function MusicSection({ playerRef, setProgressValue, progressValue, isPlaying, setIsPlaying, setCurrentSong, currentSong }: {
    playerRef: React.RefObject<HTMLVideoElement | null>,
    setProgressValue: React.Dispatch<React.SetStateAction<number>>,
    progressValue: number,
    isPlaying: boolean,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
    setCurrentSong: React.Dispatch<React.SetStateAction<TCurrentSong>>,
    currentSong: TCurrentSong
}) {
    const [sideQueue, setSideQueue] = useState<boolean>(false);
    const [queueSongs, setQueueSongs] = useState<TSong[]>([]);
    const [searchSuggestion, setSearchSuggestion] = useState<ISearchSong[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [isQueueOn, setIsQueueOn] = useState<boolean>(false);
    const [songSearched, setSongSearched] = useState<boolean>(false);
    const musciSectionRef = useRef<HTMLDivElement | null>(null);

    const inputRef = useRef<HTMLInputElement | null>(null);


    const searchSuggestionFn = async (searchSuggestion: string) => {
        // reguest to the api for search suggestion

        try {
            const response = (await axios.get(`${BASE_URL}/song/search?query=${searchSuggestion}`)).data;
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

                    {/* small screen current player */}
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
                                <QueueCards key={index} name={item.title} artist={item.artist} image={item.image} setQueueSongs={setQueueSongs} />
                            ))}

                        </div>
                    </div>
                }

                {/* search bar and invite friends */}
                <div className="  flex flex-col gap-4 px-4  ">
                    <div className=" relative flex items-center gap-4 justify-end   ">
                        <div className=" rounded-sm overflow-hidden flex gap-2 justify-center items-center bg-accent-foreground ">
                            <input ref={inputRef} type="text" id="search" placeholder="Search songs....." className=" w-[18rem] bg-accent-foreground outline-none shadow-2xl px-2 h-8 " autoComplete="off"
                                onChange={(e) => {
                                    if (e.currentTarget.value) {
                                        onSearchInputChange(e.currentTarget.value);
                                    }
                                }}
                                onFocus={() => { setIsSearching(true) }}
                                onBlur={() => { setIsSearching(false) }}
                            />
                            <Search className=" w-12 cursor-pointer " />
                            {
                                searchSuggestion.length > 0 && isSearching &&
                                <div className=" max-h-[30rem] absolute top-10 z-50 w-[21.5rem] p-2 flex flex-col gap-2 rounded-sm dark:bg-neutral-700 overflow-x-scroll  " >
                                    {searchSuggestion.map((item, index) => (
                                        <div key={index} className=" cursor-pointer px-4 py-2 rounded-sm dark:hover:bg-accent-foreground   group  flex items-center justify-between "
                                            onMouseDown={(e) => {
                                                e.stopPropagation()
                                                console.log("searching song")
                                                console.log(item)
                                                setSongSearched(true);
                                            }}
                                            onChange={(e) => { e.stopPropagation() }}
                                            onMouseEnter={() => {
                                                console.log("fuck uou")
                                            }}
                                        >
                                            <div>
                                                <h1 className="text-lg truncate w-[12rem] ">{item.title}</h1>
                                                <p className=" text-xs dark:group-hover:text-neutral-500 dark:text-neutral-400 truncate w-[12rem] " >
                                                    {item.artist}
                                                </p>
                                            </div>
                                            <Image src={item.image.url} alt="image" height={50} width={50} className="rounded-sm " />
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
                        songSearched ?
                            <SearchedMusic setSongSearched={setSongSearched} />
                            :
                            <Music setQueueSongs={setQueueSongs} type="notSearched" setCurrentSong={setCurrentSong} setIsPlaying={setIsPlaying} />
                    }
                </div>
            </div>


            {/* current playing music and playlist */}
            <div className="mt-4 col-span-2 px-2 py-4  h-full   dark:shadow-2xl  rounded dark:bg-foreground max-xl:hidden " >
                {/* muisc playing */}

                <div className="xl:h-[14rem] h-[18rem]  row-span-2 rounded-lg  w-full ">
                    <CurrentMusic playerRef={playerRef} setIsPlaying={setIsPlaying} isPlaying={isPlaying} progressValue={progressValue} setProgressValue={setProgressValue} currentSong={currentSong} />
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
                                    <QueueCards key={index} name={item.title} artist={item.artist} image={item.image} setQueueSongs={setQueueSongs} />
                                ))}

                            </div>
                    }
                </div>
            </div>
        </div>
    </>

}