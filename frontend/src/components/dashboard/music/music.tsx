import { Dispatch, SetStateAction } from "react";
import { ArtistPlaylist, artistPlaylist } from "./artistPlaylist";
import { MusicBanner } from "./musicBanner";
import { playlistItems, TQueueSong } from "./musicSection";
import { SongCards } from "./song";



export function Music({ setQueueSongs, type, recommended }: {
    setQueueSongs: Dispatch<SetStateAction<TQueueSong[]>>,
    type: "searched" | "notSearched",
    recommended: TQueueSong[],

}) {

    return (
        <>
            <div className=" h-[18rem] dark:shadow-2xl   rounded-lg overflow-hidden ">
                {
                    type === "notSearched" && <MusicBanner />
                }
            </div>
            <div className=" rounded-lg  px-4 py-2  dark:shadow-2xl  ">
                <h1 className=" text-xl font-bold font-heading ">Indie Mix</h1>
                <div className="mt-2 w-full flex items-center gap-4 justify-between  overflow-x-auto ">
                    {recommended.map((item, index) => (
                        <SongCards key={index} song={item.name} artist={item.artist} image={item.image} setQueueSongs={setQueueSongs} />
                    ))}
                </div>

            </div>
            <div className=" rounded-lg  px-4 py-2  dark:shadow-2xl  ">
                <h1 className=" text-xl font-bold font-heading ">Punjabi Songs</h1>
                <div className="mt-2 w-full flex items-center gap-4 justify-between  overflow-x-auto ">

                    {recommended.map((item, index) => (
                        <SongCards key={index} song={item.name} artist={item.artist} image={item.image} setQueueSongs={setQueueSongs} />
                    ))}
                </div>
            </div>
            <div className=" rounded-lg  px-4 py-2  dark:shadow-2xl  ">
                <h1 className=" text-xl font-bold font-heading ">Romantic Songs</h1>
                <div className="mt-2 w-full flex items-center gap-4 justify-between  overflow-x-auto ">

                    {recommended.map((item, index) => (
                        <SongCards key={index} song={item.name} artist={item.artist} image={item.image} setQueueSongs={setQueueSongs} />
                    ))}
                </div>
            </div>
            <div className=" rounded-lg  px-4 py-2  dark:shadow-2xl  ">
                <h1 className=" text-xl font-bold font-heading ">Bhojupuri Songs</h1>
                <div className="mt-2 w-full flex items-center gap-4 justify-between  overflow-x-auto ">

                    {recommended.map((item, index) => (
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
        </>
    )
}