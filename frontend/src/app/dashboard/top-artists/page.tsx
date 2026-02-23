"use client";
import { SongCardContaier } from "@/components/dashboard/music/songCardContainer";

import { IArtists } from "@/types/artistType";
import { ArtistCircleCardSkeleton } from "@/ui/artistCircleCardSkeletop";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArtistCard } from "@/components/dashboard/music/artistCard";
import { getTopArtist } from "@/api/artist/getTopArtist";

export default function TopArtists() {
  const [topArtist, setTopArtist] = useState<IArtists[]>([]);
  useEffect(() => {
    const fetchTopArtist = async () => {
      const limit = 10;
      const response = await getTopArtist(10, 1);

      setTopArtist(response);
    };
    fetchTopArtist();
  }, []);
  return (
    <>
      <div className=" sm:px-12 px-4 py-8 pb-20 ">
        <h1 className="  text-[30px] pb-4 border-b-[1px] border-muted font-medium  ">Top Artists</h1>
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
              <ArtistCard
                key={artist.id}
                name={artist.name}
                url={artist.perma_url}
                image={artist.image}
                type={"artist"}
              />
            ))}
        </SongCardContaier>
      </div>
    </>
  );
}
