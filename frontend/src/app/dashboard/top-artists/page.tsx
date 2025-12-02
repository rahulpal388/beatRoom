"use client";
import { SongCardContaier } from "@/components/dashboard/music/songCardContainer";
import { BASE_URL } from "@/lib/baseUrl";
import { ITopArtist } from "@/types/artistType";
import { ArtistCircleCardSkeleton } from "@/ui/artistCircleCardSkeletop";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TopArtists() {
  const [topArtist, setTopArtist] = useState<ITopArtist[]>([]);
  useEffect(() => {
    const fetchTopArtist = async () => {
      const limit = 20;
      const response = (
        await axios.get(`${BASE_URL}/artist/topArtist/?limit=${limit}`)
      ).data as ITopArtist[];

      setTopArtist(response);
    };
    fetchTopArtist();
  }, []);
  return (
    <>
      <div className=" sm:px-12 px-4 py-8 pb-20 ">
        <h1 className="  text-4xl ">Top Artists</h1>
        <SongCardContaier>
          {topArtist.length <= 0
            ? Array(10)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className=" flex flex-col items-center  gap-2 "
                  >
                    <ArtistCircleCardSkeleton />
                  </div>
                ))
            : topArtist.map((artist, idx) => (
                <div key={idx} className=" flex flex-col items-center  gap-2 ">
                  <Image
                    src={artist.image}
                    alt="image"
                    height={100}
                    width={100}
                    className=" rounded-full "
                  />
                  <Link
                    href={`/dashboard/artist/${artist.perma_url
                      .split("/")
                      .at(-1)}`}
                    className=" text-lg  "
                  >
                    {artist.name}
                  </Link>
                </div>
              ))}
        </SongCardContaier>
      </div>
    </>
  );
}
