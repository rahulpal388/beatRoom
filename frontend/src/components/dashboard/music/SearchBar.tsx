"use client";
import { BASE_URL } from "@/lib/baseUrl";
import { Debounce } from "@/lib/debounce";
import axios from "axios";
import { CircleUserRound, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { decodeHTML } from "@/lib/decodeHtml";
import { ISearchReco } from "@/types/searchedSongType";
import Link from "next/link";

export function SearchBar() {
  const [searchSuggestion, setSearchSuggestion] = useState<ISearchReco | null>(
    null
  );
  const [open, setOpen] = useState<boolean>(true);

  const searchSuggestionFn = async (searchSuggestion: string) => {
    // reguest to the api for search suggestion
    try {
      const response = (
        await axios.get(`${BASE_URL}/song/search?query=${searchSuggestion}`)
      ).data;

      if (response) {
        setSearchSuggestion(response);
      }
    } catch (error) {
      throw new Error("search suggestion error");
    }
  };

  const onSearchInputChange = Debounce(searchSuggestionFn, 1000);

  return (
    <div className="  overflow-hidden flex gap-2 justify-center items-center bg-accent-foreground ">
      <div className=" bg-bar rounded-sm flex items-center border-[1px] border-neutral-100/20 ">
        <input
          type="text"
          id="search"
          placeholder="Search songs....."
          className="peer w-[24rem]  outline-none shadow-2xl px-2 h-8 "
          autoComplete="off"
          onChange={(e) => {
            if (e.currentTarget.value) {
              onSearchInputChange(e.currentTarget.value);
            }
          }}
          onFocus={() => {
            setOpen(true);
          }}
          onBlur={() => {
            setOpen(false);
          }}
        />
        <Search className=" w-12 cursor-pointer " />
      </div>
      <AnimatePresence>
        {searchSuggestion && open && (
          <motion.div
            initial={{
              height: 0,
              width: 0,
              opacity: 0,
            }}
            animate={{
              height: "",
              width: "",
              opacity: 1,
            }}
            exit={{
              height: 0,
              width: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={`  ${
              open ? "block" : " hidden"
            } h-[20rem]  max-h-[30rem] absolute top-10 -left-32 z-50 w-[50rem]  px-4 py-4 rounded-sm bg-card shadow-xl overflow-hidden grid grid-cols-3  gap-4 `}
          >
            <div>
              <h1 className=" text-lg ">Songs</h1>
              <div className=" mt-2  ">
                {searchSuggestion.songs.data.slice(0, 4).map((song, idx) => (
                  <SearchedItems
                    key={idx}
                    url={song.url}
                    album={song.album}
                    type={song.type}
                    title={song.title}
                    image={song.image}
                    description={song.description}
                  />
                ))}
              </div>
            </div>
            <div>
              <h1 className=" text-lg ">Albums</h1>
              <div className=" mt-2  ">
                {searchSuggestion.albums.data.slice(0, 4).map((album, idx) => (
                  <SearchedItems
                    key={idx}
                    type={album.type}
                    url={album.url}
                    album=""
                    title={album.title}
                    image={album.image}
                    description={album.description}
                  />
                ))}
              </div>
            </div>
            <div>
              <h1 className=" text-lg  ">Artists</h1>
              <div className=" mt-2  ">
                {searchSuggestion.artists.data
                  .slice(0, 4)
                  .map((artist, idx) => (
                    <SearchedItems
                      key={idx}
                      url={artist.perma_url}
                      album=""
                      type={artist.type}
                      title={artist.name}
                      image={artist.image}
                      description={artist.type}
                    />
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SearchedItems({
  title,
  description,
  image,
  type,
  url,
  album,
}: {
  title: string;
  description: string;
  image: string;
  type: string;
  url: string;
  album: string;
}) {
  const token = url.split("/").at(-1);

  return (
    <div
      className="  px-4 py-2 rounded-sm dark:hover:bg-accent-foreground   group  flex items-center justify-between  gap-4 hover:bg-bar overflow-hidden "
      // onMouseDown={() => onSearchSong(item.id)}
    >
      <div>
        {image.length === 0 ? (
          <CircleUserRound size={40} className="stroke-1" />
        ) : (
          <Image
            src={image}
            alt="image"
            height={50}
            width={50}
            className="rounded-sm "
          />
        )}
      </div>
      <div>
        <Link href={``} className="text-lg truncate w-[10rem] ">
          {decodeHTML(title)}
        </Link>
        <p className=" text-xs dark:group-hover:text-neutral-500 dark:text-neutral-400 truncate w-[10rem] ">
          {decodeHTML(description)}
        </p>
      </div>
    </div>
  );
}

const tempSearchSongs = {
  albums: {
    data: [
      {
        id: "28523248",
        title: "Barsaat Ki Dhun",
        image:
          "https://c.saavncdn.com/600/Barsaat-Ki-Dhun-Hindi-2021-20210720121009-50x50.jpg",
        music: "Rochak Kohli, Jubin Nautiyal, Anu Malik",
        url: "https://www.jiosaavn.com/album/barsaat-ki-dhun/uTF-cH4d2Bg_",
        type: "album",
        description:
          "2021 · Hindi Album · Rochak Kohli, Jubin Nautiyal, Anu Malik",
      },
      {
        id: "48999932",
        title: "Dhundhala",
        image:
          "https://c.saavncdn.com/965/Dhundhala-Hindi-2023-20231014132506-50x50.jpg",
        music: "Yashraj, Dropped Out, Talwiinder",
        url: "https://www.jiosaavn.com/album/dhundhala/EgyqwFbmMrI_",
        type: "album",
        description: "2023 · Hindi Album · Yashraj, Dropped Out, Talwiinder",
      },
      {
        id: "25240135",
        title: "Main Jis Din Bhulaa Du",
        image:
          "https://c.saavncdn.com/947/Main-Jis-Din-Bhulaa-Du-Hindi-2021-20210210191001-50x50.jpg",
        music: "Jubin Nautiyal, Tulsi Kumar, Rochak Kohli, M. Ashraf",
        url: "https://www.jiosaavn.com/album/main-jis-din-bhulaa-du/CNEZQaYeFa0_",
        type: "album",
        description:
          "2021 · Hindi Album · Jubin Nautiyal, Tulsi Kumar, Rochak Kohli, M. Ashraf",
      },
      {
        id: "1463183",
        title: "Naanum Rowdy Dhaan",
        image:
          "https://c.saavncdn.com/139/Naanum-Rowdy-Dhaan-Tamil-2015-50x50.jpg",
        music: "Anirudh Ravichander",
        url: "https://www.jiosaavn.com/album/naanum-rowdy-dhaan/Q2Fqtq0IJKM_",
        type: "album",
        description: "2015 · Tamil Film · Anirudh Ravichander",
      },
      {
        id: "34618556",
        title: "Dhun",
        image:
          "https://c.saavncdn.com/321/Dhun-Hindi-2022-20231012102053-50x50.jpg",
        music: "Dream Note",
        url: "https://www.jiosaavn.com/album/dhun/12lSAY5-Sl4_",
        type: "album",
        description: "2022 · Hindi Album · Dream Note",
      },
    ],
  },
  songs: {
    data: [
      {
        id: "K8GXHF5k",
        title: "Dhun",
        image:
          "https://c.saavncdn.com/598/Saiyaara-Hindi-2025-20250703061754-50x50.jpg",
        album: "Saiyaara",
        url: "https://www.jiosaavn.com/song/dhun/O1AsaTx2Alg",
        type: "song",
        description: "Saiyaara · Mithoon, Arijit Singh",
        more_info: {
          primary_artists: "Mithoon, Arijit Singh",
          language: "hindi",
        },
      },
      {
        id: "bfG8irJT",
        title: "Dhun",
        image:
          "https://c.saavncdn.com/141/Saiyaara-Extended-Album-Hindi-2025-20250909145935-50x50.jpg",
        album: "Saiyaara (Extended Album)",
        url: "https://www.jiosaavn.com/song/dhun/Eg4sCR1CfWc",
        type: "song",
        description: "Saiyaara (Extended Album) · Mithoon, Arijit Singh",
        more_info: {
          primary_artists: "Mithoon, Arijit Singh",
          language: "hindi",
        },
      },
      {
        id: "U9amhr5-",
        title: "Dhundhala",
        image:
          "https://c.saavncdn.com/965/Dhundhala-Hindi-2023-20231014132506-50x50.jpg",
        album: "Dhundhala",
        url: "https://www.jiosaavn.com/song/dhundhala/JVEKXBxCAh4",
        type: "song",
        description: "Dhundhala · Yashraj, Dropped Out, Talwiinder",
        more_info: {
          primary_artists: "Yashraj, Dropped Out, Talwiinder",
          language: "hindi",
        },
      },
      {
        id: "kFX-e06P",
        title: "Dhun (From &quot;Saiyaara&quot;)",
        image:
          "https://c.saavncdn.com/307/Dhun-From-Saiyaara-Hindi-2025-20250630103138-50x50.jpg",
        album: "Dhun (From &quot;Saiyaara&quot;)",
        url: "https://www.jiosaavn.com/song/dhun-from-saiyaara/Gy4zHBEAAWM",
        type: "song",
        description: "Dhun (From &quot;Saiyaara&quot;) · Mithoon, Arijit Singh",
        more_info: {
          primary_artists: "Mithoon, Arijit Singh",
          language: "hindi",
        },
      },
      {
        id: "G9e-2ovU",
        title: "Barsaat Ki Dhun",
        image:
          "https://c.saavncdn.com/600/Barsaat-Ki-Dhun-Hindi-2021-20210720121009-50x50.jpg",
        album: "Barsaat Ki Dhun",
        url: "https://www.jiosaavn.com/song/barsaat-ki-dhun/N1EOHEZfQWY",
        type: "song",
        description:
          "Barsaat Ki Dhun · Rochak Kohli, Jubin Nautiyal, Anu Malik",
        more_info: {
          primary_artists: "Rochak Kohli, Jubin Nautiyal, Anu Malik",
          language: "hindi",
        },
      },
    ],
  },
  topquery: {
    data: [
      {
        id: "K8GXHF5k",
        title: "Dhun",
        image:
          "https://c.saavncdn.com/598/Saiyaara-Hindi-2025-20250703061754-50x50.jpg",
        album: "Saiyaara",
        url: "https://www.jiosaavn.com/song/dhun/O1AsaTx2Alg",
        type: "song",
        description: "Song by Mithoon and Arijit Singh",
        more_info: {
          primary_artists: "Mithoon, Arijit Singh",
          language: "hindi",
        },
      },
    ],
  },
  artists: {
    data: [
      {
        id: "702592",
        name: "Mithoon",
        image:
          "https://c.saavncdn.com/artists/Mithoon_002_20200908073735_150x150.jpg",
        perma_url: "https://www.jiosaavn.com/artist/mithoon-songs/nQKQiNRsTKs_",
        role: "lyricist",
        type: "artist",
      },
      {
        id: "459320",
        name: "Arijit Singh",
        image:
          "https://c.saavncdn.com/artists/Arijit_Singh_004_20241118063717_150x150.jpg",
        perma_url:
          "https://www.jiosaavn.com/artist/arijit-singh-songs/LlRWpHzy3Hk_",
        role: "singer",
        type: "artist",
      },
    ],
  },
};
