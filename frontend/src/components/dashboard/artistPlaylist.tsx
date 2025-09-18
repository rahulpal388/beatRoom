import Image from "next/image"


export const artistPlaylist = [
    {
        "name": "Arijit Singh",
        "photo": "https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg",
        "type": "Playback Singer (Bollywood, Pop)"
    },
    {
        "name": "AP Dhillon",
        "photo": "https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg",
        "type": "Singer, Rapper (Punjabi, Hip-Hop)"
    },
    {
        "name": "Taylor Swift",
        "photo": "https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg",
        "type": "Singer-Songwriter (Pop, Country)"
    },
    {
        "name": "Drake",
        "photo": "https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg",
        "type": "Rapper, Singer (Hip-Hop, R&B)"
    },
    {
        "name": "Shreya Ghoshal",
        "photo": "https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg",
        "type": "Playback Singer (Bollywood, Classical, Pop)"
    },
    {
        "name": "Eminem",
        "photo": "https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg",
        "type": "Rapper (Hip-Hop, Rap)"
    },
    {
        "name": "BTS",
        "photo": "https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg",
        "type": "Boy Band (K-Pop)"
    },
    {
        "name": "Adele",
        "photo": "https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg",
        "type": "Singer-Songwriter (Soul, Pop)"
    },
    // {
    //     "name": "The Weeknd",
    //     "photo": "https://upload.wikimedia.org/wikipedia/commons/c/c0/The_Weeknd_in_2018.png",
    //     "type": "Singer, Producer (R&B, Pop)"
    // },
    // {
    //     "name": "Badshah",
    //     "photo": "https://upload.wikimedia.org/wikipedia/commons/4/44/Rapper_Badshah_in_2022.jpg",
    //     "type": "Rapper, Singer (Hip-Hop, Punjabi, Bollywood)"
    // }
]


export function ArtistPlaylist({ name, image, type }: {
    image: string,
    name: string,
    type: string
}) {

    return <>
        <div className="  flex gap-2 cursor-pointer hover:bg-sidebar-accent-foreground py-[4px] px-2 rounded-lg overflow-hidden items-center  ">
            <Image src={image} alt="artist" height={30} width={30} className="rounded-lg h-full w-12 " />
            <div className="">
                <h1 className=" text-xl ">{name}</h1>
                <p className=" text-xs ">{type}</p>
            </div>
        </div>
    </>
}