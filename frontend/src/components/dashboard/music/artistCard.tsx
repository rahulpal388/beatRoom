import { CircleUser } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export const artistPlaylist = [
  {
    name: "Arijit Singh",
    photo:
      "https://c.saavncdn.com/740/De-De-Pyaar-De-2-Hindi-2025-20251107141020-500x500.jpg",
    type: "Playback Singer (Bollywood, Pop)",
  },
  {
    name: "AP Dhillon",
    photo:
      "https://c.saavncdn.com/740/De-De-Pyaar-De-2-Hindi-2025-20251107141020-500x500.jpg",
    type: "Singer, Rapper (Punjabi, Hip-Hop)",
  },
  {
    name: "Taylor Swift",
    photo:
      "https://c.saavncdn.com/740/De-De-Pyaar-De-2-Hindi-2025-20251107141020-500x500.jpg",
    type: "Singer-Songwriter (Pop, Country)",
  },
  {
    name: "Drake",
    photo:
      "https://c.saavncdn.com/740/De-De-Pyaar-De-2-Hindi-2025-20251107141020-500x500.jpg",
    type: "Rapper, Singer (Hip-Hop, R&B)",
  },
  {
    name: "Shreya Ghoshal",
    photo:
      "https://c.saavncdn.com/740/De-De-Pyaar-De-2-Hindi-2025-20251107141020-500x500.jpg",
    type: "Playback Singer (Bollywood, Classical, Pop)",
  },
  {
    name: "Eminem",
    photo:
      "https://c.saavncdn.com/740/De-De-Pyaar-De-2-Hindi-2025-20251107141020-500x500.jpg",
    type: "Rapper (Hip-Hop, Rap)",
  },
  {
    name: "BTS",
    photo:
      "https://c.saavncdn.com/740/De-De-Pyaar-De-2-Hindi-2025-20251107141020-500x500.jpg",
    type: "Boy Band (K-Pop)",
  },
  {
    name: "Adele",
    photo:
      "https://c.saavncdn.com/740/De-De-Pyaar-De-2-Hindi-2025-20251107141020-500x500.jpg",
    type: "Singer-Songwriter (Soul, Pop)",
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
];

export function ArtistCard({
  name,
  image,
  type,
  url,
}: {
  image: string;
  name: string;
  type: string;
  url: string;
}) {
  return (
    <>
      <div className=" w-[10rem]   py-[1px] px-2 rounded-lg overflow-hidden   flex flex-col items-center justify-center     ">
        <Link
          href={`/dashboard/artist/${url.split("/").at(-1)}`}
          className=" md:text-xl text-lg cursor-pointer hover:text-text-body flex flex-col gap-2 items-center "
        >
          {image.length > 0 ? (
            <Image
              src={image}
              alt="artist"
              height={100}
              width={100}
              className="rounded-full  h-[6rem] w-[6rem] "
            />
          ) : (
            <CircleUser className="rounded-full  h-[4rem] w-[4rem] " />
          )}
          <span className="text-center ">{name}</span>
        </Link>
      </div>
    </>
  );
}

export function ArtistCardContaier({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className=" mt-2 w-full grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2  items-center gap-6 justify-between ">
        {children}
      </div>
    </>
  );
}
