import Image from "next/image"


export const artistPlaylist = [
    {
        "name": "Arijit Singh",
        "photo": "https://c.saavncdn.com/740/De-De-Pyaar-De-2-Hindi-2025-20251107141020-500x500.jpg",
        "type": "Playback Singer (Bollywood, Pop)"
    },
    {
        "name": "AP Dhillon",
        "photo": "https://c.saavncdn.com/740/De-De-Pyaar-De-2-Hindi-2025-20251107141020-500x500.jpg",
        "type": "Singer, Rapper (Punjabi, Hip-Hop)"
    },
    {
        "name": "Taylor Swift",
        "photo": "https://c.saavncdn.com/740/De-De-Pyaar-De-2-Hindi-2025-20251107141020-500x500.jpg",
        "type": "Singer-Songwriter (Pop, Country)"
    },
    {
        "name": "Drake",
        "photo": "https://c.saavncdn.com/740/De-De-Pyaar-De-2-Hindi-2025-20251107141020-500x500.jpg",
        "type": "Rapper, Singer (Hip-Hop, R&B)"
    },
    {
        "name": "Shreya Ghoshal",
        "photo": "https://c.saavncdn.com/740/De-De-Pyaar-De-2-Hindi-2025-20251107141020-500x500.jpg",
        "type": "Playback Singer (Bollywood, Classical, Pop)"
    },
    {
        "name": "Eminem",
        "photo": "https://c.saavncdn.com/740/De-De-Pyaar-De-2-Hindi-2025-20251107141020-500x500.jpg",
        "type": "Rapper (Hip-Hop, Rap)"
    },
    {
        "name": "BTS",
        "photo": "https://c.saavncdn.com/740/De-De-Pyaar-De-2-Hindi-2025-20251107141020-500x500.jpg",
        "type": "Boy Band (K-Pop)"
    },
    {
        "name": "Adele",
        "photo": "https://c.saavncdn.com/740/De-De-Pyaar-De-2-Hindi-2025-20251107141020-500x500.jpg",
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
        <div className="  flex gap-2 cursor-pointer py-[4px] px-2 rounded-lg overflow-hidden items-center dark:bg-accent-foreground/50 dark:hover:bg-accent-foreground   ">
            <Image src={image} alt="artist" height={30} width={30} className="rounded-lg h-full w-12 " />
            <div className="">
                <h1 className=" text-lg hover:underline ">{name}</h1>
                <p className=" text-xs dark:text-neutral-600  ">{type}</p>
            </div>
        </div>
    </>
}