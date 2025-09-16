import Image from "next/image";
import { PlaylistCards } from "./playlistCard";
import { Play } from "lucide-react";
import { TrendingCards } from "./treandingCards";
import { MusicBanner } from "./musicBanner";
import { CurrentMusic } from "./currentMusic";



const playlistItems = [
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


    return <>

        <div className=" h-full grid grid-cols-8 overflow-hidden   ">
            <div className="overflow-y-auto  col-span-6  px-6 pt-4 flex flex-col gap-4   ">
                <div className="   ">

                    <div className=" h-[18rem] bg-neutral-400  rounded-lg overflow-hidden ">
                        <MusicBanner />
                    </div>
                    <div className="    rounded-lg  px-4 py-2   shadow-[0_6px_20px_oklch(10%_0.01_286.19_/_0.6)] bg-[oklch(20%_0.04_280)] ">
                        <h1 className=" text-xl font-bold font-heading ">Top 5 Trending Songs</h1>
                        <div className="mt-2 w-full flex items-center gap-4 justify-between  overflow-x-auto ">
                            {playlistItems.map((item, index) => (
                                <TrendingCards key={index} song={item.name} artist={item.artist} image={item.image} />
                            ))}
                        </div>


                    </div>
                    <div className="w-full h-[50rem] bg-red-800 ">

                    </div>
                </div>
            </div>


            {/* current playing music and playlist */}
            <div className=" col-span-2 px-2 py-4  h-full   shadow-[0_6px_20px_oklch(10%_0.01_286.19_/_0.6)]  bg-[oklch(20%_0.04_280)] " >
                <div className="h-[14rem] row-span-2 rounded-lg  w-full ">
                    <CurrentMusic />
                </div>
                <div className="  mt-12 h-[calc(100vh-3rem-14rem)]  ">
                    <h1 className=" text-lg fond-bold font-heading ">Playlist</h1>
                    <div className=" mt-4 flex flex-col gap-2 h-full  overflow-y-auto ">


                        {playlistItems.map((item, index) => (
                            <PlaylistCards key={index} name={item.name} artist={item.artist} image={item.image} />
                        ))}

                    </div>
                </div>
            </div>
        </div>
    </>

}