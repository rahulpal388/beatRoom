"use client";

import { IArtists } from "@/types/artistType";
import { ArtistCircleCardSkeleton } from "@/ui/artistCircleCardSkeletop";
import { useEffect, useState } from "react";
import { ArtistCard } from "@/components/dashboard/music/artistCard";
import { getTopArtist } from "@/api/artist/getTopArtist";

export default function TopArtists() {
  const [topArtist, setTopArtist] = useState<IArtists[]>([]);
  useEffect(() => {
    const fetchTopArtist = async () => {
      const response = await getTopArtist(20, 1);

      setTopArtist(response);
    };
    fetchTopArtist();
  }, []);
  return (
    <>
      <div className=" sm:px-12 px-4 py-8 pb-20 ">
        <h1 className="  text-[30px] pb-4 border-b-[1px] border-muted font-medium  ">
          Top Artists
        </h1>
        {topArtist.length <= 0 ? (
          Array(10)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className=" flex flex-col items-center  gap-4 ">
                <ArtistCircleCardSkeleton />
              </div>
            ))
        ) : (
          <div className=" mt-4 flex-wrap flex gap-6 items-center justify-center md:gap-2 lg:gap-4 xl:gap-10  ">
            {topArtist.map((artist) => (
              <ArtistCard
                key={artist.id}
                name={artist.name}
                url={artist.perma_url}
                image={artist.image}
                type={"artist"}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
