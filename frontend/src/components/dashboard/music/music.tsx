"use client"
import Image from "next/image";
import { QueueCards } from "./queueCard";
import { Copy, Play, SkipBack, SkipForward } from "lucide-react";
import { SongCards } from "./song";
import { MusicBanner } from "./musicBanner";
import { CurrentMusic } from "./currentMusic";
import { ArtistPlaylist, artistPlaylist } from "./artistPlaylist";
import { useEffect, useRef, useState } from "react";

export type TQueueSong = {
    name: string,
    artist: string,
    image: string
}

const playlistItems: TQueueSong[] = [
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



export function Musics() {
    const [sideQueue, setSideQueue] = useState<boolean>(false);
    const [queueSongs, setQueueSongs] = useState<TQueueSong[]>([]);
    const musciSectionRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<HTMLVideoElement | null>(null);

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

                <div className=" flex flex-col gap-4 px-4  ">
                    <div className="flex items-center gap-4 justify-end   ">
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
                    <div className=" h-[18rem] dark:shadow-2xl   rounded-lg overflow-hidden ">
                        <MusicBanner />
                    </div>
                    <div className=" rounded-lg  px-4 py-2  dark:shadow-2xl  ">
                        <h1 className=" text-xl font-bold font-heading ">Recommended Songs</h1>
                        <div className="mt-2 w-full flex items-center gap-4 justify-between  overflow-x-auto ">
                            {playlistItems.map((item, index) => (
                                <SongCards key={index} song={item.name} artist={item.artist} image={item.image} setQueueSongs={setQueueSongs} />
                            ))}
                        </div>

                    </div>
                    <div className=" rounded-lg  px-4 py-2  dark:shadow-2xl  ">
                        <h1 className=" text-xl font-bold font-heading ">Trending Songs</h1>
                        <div className="mt-2 w-full flex items-center gap-4 justify-between  overflow-x-auto ">

                            {playlistItems.map((item, index) => (
                                <SongCards key={index} song={item.name} artist={item.artist} image={item.image} setQueueSongs={setQueueSongs} />
                            ))}
                        </div>
                    </div>
                    <div className=" rounded-lg  px-4 py-2  dark:shadow-2xl  ">
                        <h1 className=" text-xl font-bold font-heading ">Artist Playlist</h1>
                        <div className="mt-2 w-full grid lg:grid-cols-2 grid-cols-1  items-center gap-6 justify-between   ">
                            {artistPlaylist.map((item, index) => (
                                <ArtistPlaylist key={index} name={item.name} image={item.photo} type={item.type} />
                            ))}
                        </div>

                    </div>
                </div>
            </div>


            {/* current playing music and playlist */}
            <div className="mt-4 col-span-2 px-2 py-4  h-full   dark:shadow-2xl  rounded dark:bg-foreground max-xl:hidden " >
                {/* muisc playing */}
                <video ref={playerRef} src={"https://aac.saavncdn.com/726/4e018130b83b4c0abbd7f41b6e5c6794_12.mp4"} className=" h-0 w-0" />
                <div className="xl:h-[14rem] h-[18rem]  row-span-2 rounded-lg  w-full ">
                    <CurrentMusic playerRef={playerRef} />
                </div>
                <div className="  mt-12 h-[calc(100vh-3rem-14rem)]  ">
                    <h1 className=" text-lg fond-bold font-heading ">Song Queue</h1>
                    {
                        queueSongs.length === 0 ?
                            <div className=" mt-20 text-center dark:text-neutral-600 ">
                                No queue songs
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