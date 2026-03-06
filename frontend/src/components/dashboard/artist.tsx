"use client";
import { getArtistInfo } from "@/api/artist/getArtistInfo";
import { SongCards } from "@/components/dashboard/music/songCard";
import { ShowDetailPlay } from "@/components/dashboard/showDetailPlay";
import { useAlbumStore } from "@/store/albumStore";
import { useSongStore } from "@/store/songStore";
import { IArtistInfo } from "@/types/artistType";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArtistComponent({
  artistInfo,
}: {
  artistInfo: IArtistInfo;
}) {
  const [active, setActive] = useState<
    "song" | "album" | "playlist" | "new_release"
  >("song");
  const addSongs = useSongStore((s) => s.actions.addSongs);
  const addAlbums = useAlbumStore((s) => s.actions.addAlbum);

  return (
    <>
      <div className="pb-26 lg:pb-20 max-sm:px-px max-md:px-4 px-12 ">
        <div className=" flex max-sm:flex-col sm:gap-8 gap-2 items-center  px-20 py-8 w-full ">
          <div>
            <Image
              src={artistInfo.image}
              alt="artist"
              height={100}
              width={100}
              className="md:h-[14rem] md:w-[15rem] sm:h-[10rem] sm:w-[10rem]   h-[10rem]  w-[10rem] rounded-full"
            />
          </div>
          <div className="  flex flex-col gap-2  max-sm:items-center ">
            <h1 className=" md:text-5xl text-3xl  font-semibold ">
              {artistInfo.name}
            </h1>
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
                setArtistInfo((prev) => {
                  if (prev) {
                    return { ...prev, isLiked: !prev.isLiked };
                  } else {
                    return null;
                  }
                });
              }}
            />
          </div>
        </div>
        <div>
          <div>
            <ul className=" flex sm:gap-12 gap-8 px-4  border-b-[1px] border-neutral-300 ">
              <li
                className={`text-lg font-light h-8 pb-2 ${
                  active === "song"
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
                className={`text-lg font-light h-8 pb-2 ${
                  active === "album"
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
                className={`text-lg font-light h-8 pb-2 ${
                  active === "playlist"
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
                className={`text-lg font-light h-8 pb-2 ${
                  active === "new_release"
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
            <div className="  mt-8 flex flex-wrap gap-4 md:gap-3    ">
              {active === "song" &&
                artistInfo.topSongs.map((song, idx) => (
                  <SongCards
                    key={idx}
                    songs={song}
                    updateState={(id: string) => {
                      setArtistInfo({
                        ...artistInfo,
                        topSongs: artistInfo.topSongs.map((x) =>
                          x.id === id ? { ...x, isLiked: !x.isLiked } : x,
                        ),
                      });
                    }}
                  />
                ))}
            </div>
            <div className="   mt-8 flex flex-wrap gap-4 md:gap-3  ">
              {active === "album" &&
                artistInfo.topAlbums.map((song, idx) => (
                  <SongCards
                    key={idx}
                    songs={song}
                    updateState={(id: string) => {
                      setArtistInfo({
                        ...artistInfo,
                        topAlbums: artistInfo.topAlbums.map((x) =>
                          x.id === id ? { ...x, isLiked: !x.isLiked } : x,
                        ),
                      });
                    }}
                  />
                ))}
            </div>
            <div>
              {active === "playlist" && (
                <div>
                  <div>
                    <h1 className=" text-2xl px-4  border-b-[1px] border-neutral-300 ">
                      Featured In
                    </h1>
                    <div className="  mt-8 flex flex-wrap gap-4 md:gap-3  ">
                      {artistInfo.featured_artist_playlist.map((song, idx) => (
                        <SongCards
                          key={idx}
                          songs={song}
                          updateState={(id: string) => {
                            setArtistInfo({
                              ...artistInfo,
                              featured_artist_playlist:
                                artistInfo.featured_artist_playlist.map((x) =>
                                  x.id === id
                                    ? { ...x, isLiked: !x.isLiked }
                                    : x,
                                ),
                            });
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className=" mt-4 ">
                    <h1 className=" text-2xl px-4 border-b-[1px] border-neutral-300 ">
                      Just {artistInfo.name}
                    </h1>
                    <div className="  mt-8 flex flex-wrap gap-4 md:gap-3 ">
                      {artistInfo.dedicated_artist_playlist.map((song, idx) => (
                        <SongCards
                          key={idx}
                          songs={song}
                          updateState={(id: string) => {
                            setArtistInfo({
                              ...artistInfo,
                              dedicated_artist_playlist:
                                artistInfo.dedicated_artist_playlist.map((x) =>
                                  x.id === id
                                    ? { ...x, isLiked: !x.isLiked }
                                    : x,
                                ),
                            });
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
                      setArtistInfo({
                        ...artistInfo,
                        latest_release: artistInfo.latest_release.map((x) =>
                          x.id === id ? { ...x, isLiked: !x.isLiked } : x,
                        ),
                      });
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
