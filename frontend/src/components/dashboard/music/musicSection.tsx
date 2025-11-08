"use client";
import Image from "next/image";
import { QueueCards } from "./queueCard";
import {
  Copy,
  Play,
  Search,
  SkipBack,
  SkipForward,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { SongCards } from "./songCard";
import { MusicBanner } from "./musicBanner";
import { CurrentMusic } from "./currentMusic";
import { ArtistPlaylist, artistPlaylist } from "./artistPlaylist";
import React, { useEffect, useRef, useState } from "react";
import { i, p } from "motion/react-client";
import axios from "axios";
import { BASE_URL } from "@/lib/baseUrl";
import { Debounce } from "@/lib/debounce";
import { Music, TSong } from "./music";
import { SearchedMusic } from "./searchedMusic";
import { TCurrentSong } from "@/app/dashboard/[userId]/page";
import { ISong } from "@/types/searchedSongType";
import { IAlbumSongs } from "@/types/albumType";
import { ITrendingSong } from "@/types/trendingSongType";
import { useCurrentSongDetail } from "@/context/currentSong";
import { MusicBar } from "./MusicBar";
import { SongQueue } from "./songQueue";

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

export function MusicSection() {
  const [searchSuggestion, setSearchSuggestion] = useState<ISearchSong[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [songSuggestion, setSongSuggestion] = useState<boolean>(false);
  const [song, setSong] = useState<ISong>();
  const [album, setAlbum] = useState<IAlbumSongs>();
  const [trending, setTrending] = useState<ITrendingSong[]>();
  const musciSectionRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchSuggestionFn = async (searchSuggestion: string) => {
    // reguest to the api for search suggestion

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

  const onSearchSong = async (id: string) => {
    setSongSuggestion(true);

    // get more information about the song
    const getSongInfo = (
      await axios.get(`${BASE_URL}/song/${id}`, { withCredentials: true })
    ).data as ISong;
    setSong(getSongInfo);

    const getAlbumSongs = (
      await axios.get(`${BASE_URL}/song/albums/${getSongInfo.album.id}`, {
        withCredentials: true,
      })
    ).data as IAlbumSongs;
    setAlbum(getAlbumSongs);

    console.log(getSongInfo.language);
    const getTrendingSong = (
      await axios.get(
        `${BASE_URL}/song/trending/${getSongInfo.language}/0/10`,
        { withCredentials: true }
      )
    ).data as ITrendingSong[];

    setTrending(getTrendingSong);

    console.log(getSongInfo);
    console.log(getAlbumSongs);
    console.log(trending);
  };

  //   useEffect(() => {
  //     if (sideQueue && musciSectionRef.current) {
  //       musciSectionRef.current.classList.remove("overflow-y-auto");
  //       musciSectionRef.current.classList.add("overflow-hidden");
  //     } else {
  //       musciSectionRef.current?.classList.remove("overflow-hidden");
  //       musciSectionRef.current?.classList.add("overflow-y-auto");
  //     }
  //   }, [sideQueue]);

  return (
    <>
      <div className=" h-full grid grid-cols-8 overflow-hidden   ">
        {/* this section show the music bar and queue songs that will only display in smaller divice and make it work */}

        <div
          ref={musciSectionRef}
          className=" overflow-y-auto  col-span-6 max-xl:col-span-8  pt-4 flex flex-col gap-4  pb-36 "
        >
          <MusicBar />
          {/* queue that will be shown in smaller size device */}
          {/* {sideQueue && (
            <div className="absolute top-30 right-0 bottom-0 z-30 h-[calc(100%-9rem)] px-4 dark:bg-foreground xl:hidden ">
              <div className=" mt-4 flex flex-col gap-2 h-full  overflow-y-auto ">
                <h1 className=" text-lg fond-bold font-heading ">Song Queue</h1>
                {queueSongs.map((item, index) => (
                  <QueueCards
                    key={index}
                    name={item.title}
                    artist={item.artist}
                    image={item.image}
                    setQueueSongs={setQueueSongs}
                  />
                ))}
              </div>
            </div>
          )} */}

          {/* search bar and invite friends */}
          <div className="  flex flex-col gap-4 px-4  ">
            <div className=" relative flex items-center gap-4 justify-end   ">
              <div className=" rounded-sm overflow-hidden flex gap-2 justify-center items-center bg-accent-foreground ">
                <input
                  ref={inputRef}
                  type="text"
                  id="search"
                  placeholder="Search songs....."
                  className=" w-[18rem] bg-accent-foreground outline-none shadow-2xl px-2 h-8 "
                  autoComplete="off"
                  onChange={(e) => {
                    if (e.currentTarget.value) {
                      onSearchInputChange(e.currentTarget.value);
                    }
                  }}
                  onFocus={() => {
                    setIsSearching(true);
                  }}
                  onBlur={() => {
                    setIsSearching(false);
                  }}
                />
                <Search className=" w-12 cursor-pointer " />
                {searchSuggestion.length > 0 && isSearching && (
                  <div className=" max-h-[30rem] absolute top-10 z-50 w-[21.5rem] p-2 flex flex-col gap-2 rounded-sm dark:bg-neutral-700 overflow-x-scroll  ">
                    {searchSuggestion.map((item, index) => (
                      <div
                        key={index}
                        className=" cursor-pointer px-4 py-2 rounded-sm dark:hover:bg-accent-foreground   group  flex items-center justify-between "
                        onMouseDown={() => onSearchSong(item.id)}
                      >
                        <div>
                          <h1 className="text-lg truncate w-[12rem] ">
                            {item.title}
                          </h1>
                          <p className=" text-xs dark:group-hover:text-neutral-500 dark:text-neutral-400 truncate w-[12rem] ">
                            {item.artist}
                          </p>
                        </div>
                        <Image
                          src={item.image.url}
                          alt="image"
                          height={50}
                          width={50}
                          className="rounded-sm "
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button className=" cursor-pointer dark:shadow-xl dark:bg-accent-foreground/50 dark:hover:bg-accent-foreground px-4 py-2 rounded text-muted flex gap-2 items-center ">
                Invite friends
                <Copy />
              </button>
              {/* <button
                className=" cursor-pointer dark:shadow-xl dark:bg-accent-foreground/50 dark:hover:bg-accent-foreground px-4 py-2 rounded text-muted xl:hidden "
                onClick={() => {
                  setSideQueue((prev) => (prev = !prev));
                }}
              >
                Queue Songs
              </button> */}
            </div>

            {/*  music section display  */}
            {songSuggestion ? (
              <SearchedMusic
                setSongSuggestion={setSongSuggestion}
                song={song}
                album={album}
                trending={trending}
              />
            ) : (
              <Music type="notSearched" />
            )}
          </div>
        </div>

        {/* current playing music and playlist */}
        <div className="mt-4 col-span-2 px-2 py-4  h-full   dark:shadow-2xl  rounded dark:bg-foreground max-xl:hidden ">
          {/* muisc playing */}

          <div className="xl:h-[14rem] h-[18rem]  row-span-2 rounded-lg  w-full ">
            <CurrentMusic />
          </div>
          <div className="  mt-12 h-[calc(100vh-3rem-14rem)]  "></div>
          <SongQueue />
        </div>
      </div>
    </>
  );
}
