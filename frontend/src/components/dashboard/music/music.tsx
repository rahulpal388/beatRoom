import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ArtistPlaylist, artistPlaylist } from "./artistPlaylist";
import { MusicBanner } from "./musicBanner";
import { SongCards, SongsSection } from "./songCard";
import axios from "axios";
import { BASE_URL } from "@/lib/baseUrl";

export type TSong = {
    name: string,
    artist: string,
    image: string
}

type TPlaylist = {
    indiePlaylist: TSong[],
    punjabiPlaylist: TSong[],
    romanticPlaylist: TSong[],
    bhojpuriPlaylist: TSong[]
}


export function Music({ setQueueSongs, type }: {
    setQueueSongs: Dispatch<SetStateAction<TSong[]>>,
    type: "searched" | "notSearched",

}) {

    const [playlist, setPlaylist] = useState<TPlaylist | null>(null);

    useEffect(() => {

        const getPlaylist = async () => {

            const response = await axios.post(`${BASE_URL}/song/playlist/all`,
                {
                    indie: "https://www.jiosaavn.com/featured/best-of-indie-hindi/jnjK2XTv9-3uCJW60TJk1Q__",
                    punjabi: "https://www.jiosaavn.com/featured/punjabi-india-superhits-top-50/wSwarbl2bQSrB59Sr2unUQ__",
                    romantic: "https://www.jiosaavn.com/featured/most-streamed-love-songs-hindi/RQKZhDpGh8uAIonqf0gmcg__",
                    bhojpuri: "https://www.jiosaavn.com/featured/bhojpuri-india-superhits-top-50/8c-UE,,iBhN8497ZNqIDKA__"
                },
                { withCredentials: true }
            );

            console.log(response.data);

            setPlaylist(response.data);


        }

        getPlaylist();

    }, [])

    return (
        <>
            <div className=" h-[18rem] dark:shadow-2xl   rounded-lg overflow-hidden ">
                {
                    type === "notSearched" && <MusicBanner />
                }
            </div>
            <SongsSection setQueueSongs={setQueueSongs} heading="Indi Songs" songs={playlist?.indiePlaylist} />
            <SongsSection setQueueSongs={setQueueSongs} heading="Punjabi Songs" songs={playlist?.punjabiPlaylist} />
            <SongsSection setQueueSongs={setQueueSongs} heading="Romantic Songs" songs={playlist?.romanticPlaylist} />
            <SongsSection setQueueSongs={setQueueSongs} heading="Bhojpuri Songs" songs={playlist?.bhojpuriPlaylist} />
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