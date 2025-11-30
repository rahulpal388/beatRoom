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
import { useParams } from "next/navigation";

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
    <div className="  overflow-hidden flex gap-2 justify-center items-center  ">
      <div className=" bg-bar h-10 rounded-3xl flex items-center border-[1px] border-card-border overflow-hidden ">
        <input
          type="text"
          id="search"
          placeholder="Search songs....."
          className="peer w-[24rem] h-full  outline-none shadow-2xl px-4 "
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
        <div className=" bg-card-hover h-full w-14 flex items-center justify-center cursor-pointer ">
          <Search size={30} />
        </div>
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
            }  absolute top-12 -left-32 z-50 w-[60rem]  px-4 py-4 rounded-sm bg-card shadow-xl overflow-hidden grid grid-cols-3  gap-4 `}
            onFocus={() => {
              setOpen(true);
            }}
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
      className="  px-2 py-2 rounded-sm hover:bg-card-hover   group  flex items-center   gap-4 hover:bg-bar overflow-hidden "
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
        <Link
          href={`${
            type === "song"
              ? `/dashboard/${type}/${token}/search`
              : `/dashboard/${type}/${token}`
          }`}
          className="text-lg line-clamp-1 w-[12rem] "
        >
          {decodeHTML(title)}
        </Link>
        <p className=" text-xs dark:group-hover:text-neutral-500 dark:text-neutral-400 line-clamp-1 w-[12rem] ">
          {decodeHTML(description)}
        </p>
      </div>
    </div>
  );
}
