import Image from "next/image";
import { PlaylistCards } from "./queueCard";
import { Copy, Play } from "lucide-react";
import { TrendingCards } from "./treandingCards";
import { MusicBanner } from "./musicBanner";
import { CurrentMusic } from "./currentMusic";
import { ArtistPlaylist, artistPlaylist } from "./artistPlaylist";



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
            <div className="overflow-y-auto  col-span-6  px-6 pt-4 flex flex-col gap-4  pb-36 ">
                <div className=" flex flex-col gap-4  ">
                    <div className="flex items-center justify-end   ">
                        <button className=" cursor-pointer dark:shadow-xl dark:bg-accent-foreground/50 dark:hover:bg-accent-foreground px-4 py-2 rounded text-muted flex gap-2 items-center ">
                            Invite friends
                            <Copy />
                        </button>
                    </div>
                    <div className=" h-[18rem] dark:shadow-2xl   rounded-lg overflow-hidden ">
                        <MusicBanner />
                    </div>
                    <div className=" rounded-lg  px-4 py-2  dark:shadow-2xl  ">
                        <h1 className=" text-xl font-bold font-heading ">Recommended Songs</h1>
                        <div className="mt-2 w-full flex items-center gap-4 justify-between  overflow-x-auto ">
                            {playlistItems.map((item, index) => (
                                <TrendingCards key={index} song={item.name} artist={item.artist} image={item.image} />
                            ))}
                        </div>

                    </div>
                    <div className=" rounded-lg  px-4 py-2  dark:shadow-2xl  ">
                        <h1 className=" text-xl font-bold font-heading ">Trending Songs</h1>
                        <div className="mt-2 w-full flex items-center gap-4 justify-between  overflow-x-auto ">

                            {playlistItems.map((item, index) => (
                                <TrendingCards key={index} song={item.name} artist={item.artist} image={item.image} />
                            ))}
                        </div>
                    </div>
                    <div className=" rounded-lg  px-4 py-2  dark:shadow-2xl  ">
                        <h1 className=" text-xl font-bold font-heading ">Artist Playlist</h1>
                        <div className="mt-2 w-full grid grid-cols-2 items-center gap-6 justify-between   ">
                            {artistPlaylist.map((item, index) => (
                                <ArtistPlaylist key={index} name={item.name} image={item.photo} type={item.type} />
                            ))}
                        </div>

                    </div>
                </div>
            </div>


            {/* current playing music and playlist */}
            <div className="mt-4 col-span-2 px-2 py-4  h-full   dark:shadow-2xl  rounded dark:bg-foreground " >
                <div className="h-[16rem]  row-span-2 rounded-lg  w-full overflow-y-scroll ">
                    <CurrentMusic />
                    <div className="mt-4 h-6">
                        <button className="  bg-accent text-muted flex gap-2 items-center ">
                            Invite friends
                            <Copy />
                        </button>
                    </div>
                </div>
                <div className="  mt-12 h-[calc(100vh-3rem-14rem)]  ">
                    <h1 className=" text-lg fond-bold font-heading ">Song Queue</h1>
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