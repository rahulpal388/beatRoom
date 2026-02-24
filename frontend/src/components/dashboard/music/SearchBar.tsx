"use client";
import { Debounce } from "@/lib/debounce";
import axios from "axios";
import { CircleUserRound, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { decodeHTML } from "@/lib/decodeHtml";
import Link from "next/link";
import { ISearchReco } from "@/types/searchType";
import { searchReco } from "@/api/searchReco";
import { div } from "motion/react-client";

export function SearchBar() {
    const [searchSuggestion, setSearchSuggestion] = useState<ISearchReco | null>(
        null
    );
    const [open, setOpen] = useState<boolean>(true);

    const searchSuggestionFn = async (searchSuggestion: string) => {
        // reguest to the api for search suggestion

        const response = await searchReco(searchSuggestion);

        console.log(response);
        if (response) {
            setSearchSuggestion(response);
        }

    };

    const onSearchInputChange = Debounce(searchSuggestionFn, 1000);

    return (
        <div className="  overflow-hidden flex max-lg:flex-col gap-2 justify-center items-center   ">
            <div className=" bg-bar h-10 rounded-3xl flex justify-center  items-center border-[1px]  border-card-border focus-within:border-primary overflow-hidden ">
                <input
                    type="text"
                    id="search"
                    placeholder="Search songs....."
                    className="peer w-[24rem] max-sm:w-[16rem] h-full  outline-none shadow-2xl px-4 "
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
                <div className=" bg-primary  h-full w-14 flex items-center justify-center cursor-pointer ">
                    <Search size={30} className="  stroke-background " />
                </div>
            </div>
            <div className="max-lg:hidden">
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
                            className={`  ${open ? "block" : " hidden"
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
                                                url={artist.url}
                                                type={artist.type}
                                                title={artist.title}
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
            <div className=" lg:hidden w-full max-sm:px-4 px-12 mt-8  pb-32">
                {searchSuggestion && (
                    <div className=" flex flex-col gap-8">
                        <div>
                            <h1 className=" text-lg font-medium max-lg:text-xl ">Songs</h1>
                            <div className=" mt-2 flex flex-wrap gap-2   ">
                                {searchSuggestion.songs.data.slice(0, 4).map((song, idx) => (
                                    <SearchedItems
                                        key={idx}
                                        url={song.url}
                                        type={song.type}
                                        title={song.title}
                                        image={song.image}
                                        description={song.description}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h1 className=" text-lg font-medium max-lg:text-xl ">Albums</h1>
                            <div className=" mt-2 flex flex-wrap gap-2  ">
                                {searchSuggestion.albums.data.slice(0, 4).map((album, idx) => (
                                    <SearchedItems
                                        key={idx}
                                        type={album.type}
                                        url={album.url}
                                        title={album.title}
                                        image={album.image}
                                        description={album.description}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h1 className=" text-lg font-medium max-lg:text-xl  ">Artists</h1>
                            <div className=" mt-2 flex flex-wrap gap-2   ">
                                {searchSuggestion.artists.data
                                    .slice(0, 4)
                                    .map((artist, idx) => (
                                        <SearchedItems
                                            key={idx}
                                            url={artist.url}
                                            type={artist.type}
                                            title={artist.title}
                                            image={artist.image}
                                            description={artist.type}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

function SearchedItems({
    title,
    description,
    image,
    type,
    url,
}: {
    title: string;
    description: string;
    image: string;
    type: string;
    url: string;
}) {
    const token = url.split("/").at(-1);
    const qualityImage = image.replace("50x50", "500x500")
    return (
        <div        >
            <Link
                href={`${type === "song"
                    ? `/dashboard/${type}/${token}/search`
                    : `/dashboard/${type}/${token}`
                    }`}
                className="  px-2 py-2 rounded-sm hover:bg-card-hover   group  flex max-lg:flex-col md:items-center   gap-4 hover:bg-bar overflow-hidden "
            >
                <div>
                    {image.length === 0 ? (
                        <CircleUserRound size={40} className="stroke-1" />
                    ) : (
                        <Image
                            src={qualityImage}
                            alt="image"
                            height={100}
                            width={100}
                            className="rounded-sm  max-lg:h-[12rem] max-lg:w-[12rem]  max-md:h-[10rem] max-md:w-[10rem] max-sm:h-[8rem] max-sm:w-[8rem] "
                        />
                    )}
                </div>
                <div>

                    <p className="text-lg   line-clamp-1 w-[12rem] max-md:w-[10rem] max-sm:w-[8rem]  "> {decodeHTML(title)}</p>
                    <p className=" text-xs dark:group-hover:text-neutral-500 dark:text-neutral-400 line-clamp-1 w-[12rem] max-md:w-[10rem]  max-sm:w-[8rem] ">
                        {decodeHTML(description)}
                    </p>
                </div>
            </Link>
        </div>
    );
}