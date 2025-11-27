"use client";
import { BASE_URL } from "@/lib/baseUrl";
import { Debounce } from "@/lib/debounce";
import axios from "axios";
import { Search } from "lucide-react";
import Image from "next/image";
import { it } from "node:test";
import { useState } from "react";

type ISearchSong = {
  id: string;
  title: string;
  image: {
    quality: string;
    url: string;
  };
  album: string;
  type: string;
  artist: string;
  language: string;
};

export function SearchBar() {
  const [searchSuggestion, setSearchSuggestion] = useState<ISearchSong[]>([]);

  const searchSuggestionFn = async (searchSuggestion: string) => {
    // reguest to the api for search suggestion
    console.log("hello world");
    try {
      const response = (
        await axios.get(`${BASE_URL}/song/search?query=${searchSuggestion}`)
      ).data;
      const data = response.results;
      console.log(data[0].image);
      setSearchSuggestion([...data]);
    } catch (error) {
      throw new Error("search suggestion error");
    }
  };

  const onSearchInputChange = Debounce(searchSuggestionFn, 1000);

  return (
    <div className=" rounded-sm overflow-hidden flex gap-2 justify-center items-center bg-accent-foreground ">
      <input
        type="text"
        id="search"
        placeholder="Search songs....."
        className="peer w-[18rem] bg-accent-foreground outline-none shadow-2xl px-2 h-8 "
        autoComplete="off"
        onChange={(e) => {
          if (e.currentTarget.value) {
            onSearchInputChange(e.currentTarget.value);
          }
        }}
      />
      <Search className=" w-12 cursor-pointer " />
      {searchSuggestion.length > 0 && (
        <div className="peer-focus:block hidden  max-h-[30rem] absolute top-10 z-50 w-[21.5rem] p-2 rounded-sm dark:bg-neutral-700 overflow-x-scroll  ">
          {searchSuggestion.map((item, index) => (
            <SearchedItems
              key={index}
              title={item.title}
              artists={item.artist}
              image={item.image.url}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SearchedItems({
  title,
  artists,
  image,
}: {
  title: string;
  artists: string;
  image: string;
}) {
  return (
    <div
      className=" cursor-pointer px-4 py-2 rounded-sm dark:hover:bg-accent-foreground   group  flex items-center justify-between "
      // onMouseDown={() => onSearchSong(item.id)}
    >
      <div>
        <h1 className="text-lg truncate w-[12rem] ">{title}</h1>
        <p className=" text-xs dark:group-hover:text-neutral-500 dark:text-neutral-400 truncate w-[12rem] ">
          {artists}
        </p>
      </div>
      <Image
        src={image}
        alt="image"
        height={50}
        width={50}
        className="rounded-sm "
      />
    </div>
  );
}
