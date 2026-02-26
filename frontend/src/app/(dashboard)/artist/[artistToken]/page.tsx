"use client";
import { getArtistInfo } from "@/api/artist/getArtistInfo";
import { SongCards } from "@/components/dashboard/music/songCard";
import { ShowDetailPlay } from "@/components/dashboard/showDetailPlay";
import { IArtistInfo } from "@/types/artistType";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Artist() {
  const { artistToken } = useParams();
  const [artistInfo, setArtistInfo] = useState<IArtistInfo | null>(null);
  const [active, setActive] = useState<
    "song" | "album" | "playlist" | "new_release"
  >("song");

  useEffect(() => {
    const fetchArtistInfo = async () => {
      const response = await getArtistInfo(artistToken as string);

      setArtistInfo(response);
    };
    fetchArtistInfo();
  }, [artistToken]);

  if (!artistInfo) {
    return (
      <>
        <div>artist not found</div>
      </>
    );
  }

  return (
    <>
      <div className="pb-20  sm:px-12  md:px-4 ">
        <div className=" flex max-sm:flex-col sm:gap-8 gap-2 items-center  px-20 py-8 w-full ">
          <div>
            <Image
              src={artistInfo.image}
              alt="artist"
              height={100}
              width={100}
              className="md:h-[15rem] md:w-[15rem] sm:h-[12rem] sm:w-[12rem]   h-[10rem]  w-[10rem] rounded-full"
            />
          </div>
          <div className="  flex flex-col gap-2  max-md:items-center ">
            <h1 className=" text-5xl font-semibold ">{artistInfo.name}</h1>
            <p>
              {artistInfo.type[0].toUpperCase() + artistInfo.type.slice(1)}{" "}
              &#8226;
              {" " + Number(artistInfo.follower_count).toLocaleString()}{" "}
              Followers
            </p>
            <ShowDetailPlay
              items={artistInfo}
              type={artistInfo.type}
              onSave={async () => {
                // setArtistInfo((prev) => {
                //   if (prev) {
                //     return { ...prev, isLiked: !prev.isLiked };
                //   } else {
                //     return null;
                //   }
                // });
              }}
            />
          </div>
        </div>
        <div>
          <div>
            <ul className=" flex sm:gap-12 gap-4 border-b-[1px] border-neutral-300 ">
              <li
                className={`text-lg font-light h-8 pb-2 ${active === "song"
                  ? "border-b-2 border-primary "
                  : "hover:border-b-2 hover:border-primary "
                  }  `}
                onClick={() => {
                  setActive("song");
                }}
              >
                <Link href={""}>Song</Link>
              </li>
              <li
                className={`text-lg font-light h-8 pb-2 ${active === "album"
                  ? "border-b-2 border-primary "
                  : "hover:border-b-2 hover:border-primary "
                  }  `}
                onClick={() => {
                  setActive("album");
                }}
              >
                <Link href={""}>Album</Link>
              </li>
              <li
                className={`text-lg font-light h-8 pb-2 ${active === "playlist"
                  ? "border-b-2 border-primary "
                  : "hover:border-b-2 hover:border-primary "
                  }  `}
                onClick={() => {
                  setActive("playlist");
                }}
              >
                <Link href={""}>Playlist</Link>
              </li>
              <li
                className={`text-lg font-light h-8 pb-2 ${active === "new_release"
                  ? "border-b-2 border-primary "
                  : "hover:border-b-2 hover:border-primary "
                  }  `}
                onClick={() => {
                  setActive("new_release");
                }}
              >
                <Link href={""}>New Release</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="  mt-8 grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8  ">
              {active === "song" &&
                artistInfo.topSongs.map((song, idx) => (
                  <SongCards
                    key={idx}
                    songs={song}
                    updateState={() => {
                      // setArtistInfo()
                    }}
                  />
                ))}
            </div>
            <div className="  mt-8 grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8  ">
              {active === "album" &&
                artistInfo.topAlbums.map((song, idx) => (
                  <SongCards
                    key={idx}
                    songs={song}
                    updateState={() => {
                    }}
                  />
                ))}
            </div>
            <div>
              {active === "playlist" && (
                <div>
                  <div>
                    <h1 className=" text-2xl  border-b-[1px] border-neutral-300 ">
                      Featured In
                    </h1>
                    <div className=" mt-8 grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8  ">
                      {artistInfo.featured_artist_playlist.map((song, idx) => (
                        <SongCards
                          key={idx}
                          songs={song}
                          updateState={(id: string) => {
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className=" mt-4 ">
                    <h1 className=" text-2xl  border-b-[1px] border-neutral-300 ">
                      Just {artistInfo.name}
                    </h1>
                    <div className=" w-full mt-8 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8  ">
                      {artistInfo.dedicated_artist_playlist.map((song, idx) => (
                        <SongCards
                          key={idx}
                          songs={song}
                          updateState={(id: string) => {
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {active === "new_release" && (
            <div className=" ">
              <h1 className=" text-2xl  ">New Released</h1>
              <div className="  mt-8 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8  ">
                {artistInfo.latest_release.map((song, idx) => (
                  <SongCards
                    key={idx}
                    songs={song}
                    updateState={(id: string) => {
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
