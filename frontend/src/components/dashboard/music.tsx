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
    // {
    //     "name": "Bad Guy",
    //     "artist": "Billie Eilish",
    //     "image": "https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg"
    // },
    // {
    //     "name": "Someone You Loved",
    //     "artist": "Lewis Capaldi",
    //     "image": "https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg"
    // },
    // {
    //     "name": "Happier",
    //     "artist": "Marshmello, Bastille",
    //     "image": "https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg"
    // }
]



export function Musics() {


    return <>

        <div className=" h-full flex   ">
            <div className="  flex-3 px-6 pt-4 flex flex-col gap-4   ">
                <div className=" h-[18rem] bg-neutral-400 w-full rounded-lg overflow-hidden ">
                    <MusicBanner />
                </div>
                <div className="   w-full rounded-lg  px-4 py-2   shadow-[0_6px_20px_oklch(10%_0.01_286.19_/_0.6)] bg-[oklch(20%_0.04_280)] ">
                    <h1 className=" text-xl font-bold font-heading ">Top 5 Trending Songs</h1>
                    <div className="mt-2 flex items-center justify-between ">
                        {playlistItems.map((item, index) => (
                            <TrendingCards key={index} song={item.name} artist={item.artist} image={item.image} />
                        ))}
                    </div>

                </div>
            </div>


            {/* current playing music and playlist */}
            <div className=" flex-1 px-2 py-4    shadow-[0_6px_20px_oklch(10%_0.01_286.19_/_0.6)]  bg-[oklch(20%_0.04_280)] " >
                <div className=" h-[14rem] rounded-lg  w-full ">
                    <CurrentMusic />
                </div>
                <div className="  mt-12  ">
                    <h1 className=" text-lg fond-bold font-heading ">Playlist</h1>
                    <div className=" mt-4 flex flex-col gap-2  ">
                        {playlistItems.map((item, index) => (
                            <PlaylistCards key={index} name={item.name} artist={item.artist} image={item.image} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>

}