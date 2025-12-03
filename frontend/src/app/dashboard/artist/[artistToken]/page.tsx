"use client";
import { SongCards } from "@/components/dashboard/music/songCard";
import { IArtistInfo } from "@/types/artistType";
import { Button } from "@/ui/button";
import axios from "axios";
import { EllipsisVertical, Heart } from "lucide-react";
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
      const response = (
        await axios.get(
          `http://localhost:8080/api/v1/artist/?artistToken=${artistToken}`
        )
      ).data;

      setArtistInfo(response);
    };
    fetchArtistInfo();
  }, []);

  if (!artistInfo) {
    return (
      <>
        <div>artist not found</div>
      </>
    );
  }

  return (
    <>
      <div className="pb-20  px-12">
        <div className=" flex gap-8 items-center  px-20 py-8 w-full ">
          <div>
            <Image
              src={artistInfo.image}
              alt="artist"
              height={100}
              width={100}
              className="h-[15rem] w-[15rem] rounded-full"
            />
          </div>
          <div className="  flex flex-col gap-2">
            <h1 className=" text-5xl font-semibold ">{artistInfo.name}</h1>
            {/* <p>{artistInfo.subtitle}</p>
            <p>{artistInfo.follower_count}</p> */}
            <div className="mt-8 flex items-center gap-8  ">
              <Button
                name="Play"
                type="button"
                btnType="Primary"
                className=" px-8 py-4 "
              />
              <Heart size={40} />
              <EllipsisVertical size={40} />
            </div>
          </div>
        </div>
        <div>
          <div>
            <ul className=" flex gap-12 border-b-[1px] border-neutral-100/10 ">
              <li
                className={`text-lg font-light h-8 pb-2 ${
                  active === "song"
                    ? "border-b-2 border-neutral-700/60 "
                    : "hover:border-b-2 hover:border-neutral-700/60 "
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
                    ? "border-b-2 border-neutral-700/60 "
                    : "hover:border-b-2 hover:border-neutral-700/60 "
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
                    ? "border-b-2 border-neutral-700/60 "
                    : "hover:border-b-2 hover:border-neutral-700/60 "
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
                    ? "border-b-2 border-neutral-700/60 "
                    : "hover:border-b-2 hover:border-neutral-700/60 "
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
            <div className="  mt-8 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8  ">
              {active === "song" &&
                artistInfo.topSongs.map((song, idx) => (
                  <SongCards key={idx} songs={song} />
                ))}
            </div>
            <div className="  mt-8 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8  ">
              {active === "album" &&
                artistInfo.topAlbums.map((song, idx) => (
                  <SongCards key={idx} songs={song} />
                ))}
            </div>
            <div>
              {active === "playlist" && (
                <div>
                  <div>
                    <h1 className=" text-2xl  ">Featured In</h1>
                    <div className=" mt-8 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8  ">
                      {artistInfo.featured_artist_playlist.map((song, idx) => (
                        <SongCards key={idx} songs={song} />
                      ))}
                    </div>
                  </div>
                  <div className=" mt-4 ">
                    <h1 className=" text-2xl  ">Just {artistInfo.name}</h1>
                    <div className=" w-full mt-8 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8  ">
                      {artistInfo.dedicated_artist_playlist.map((song, idx) => (
                        <SongCards key={idx} songs={song} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="  mt-8 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8  ">
            {active === "new_release" &&
              artistInfo.latest_release.map((song, idx) => (
                <SongCards key={idx} songs={song} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
