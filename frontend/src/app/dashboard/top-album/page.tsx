"use client";

import { SongCards } from "@/components/dashboard/music/songCard";
import { SongCardContaier } from "@/components/dashboard/music/songCardContainer";
import { BASE_URL } from "@/lib/baseUrl";
import { IAlbums } from "@/types/albumType";
import { MoreSkeletonCard } from "@/ui/cardSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TopAlbum() {
  const [topAlbum, setTopAlbum] = useState<IAlbums[]>([]);

  useEffect(() => {
    const fetchTopAlbum = async () => {
      const limit = 20;
      const page = 0;
      const language = "hindi";
      const respose = (
        await axios.get(
          `${BASE_URL}/album/trendingAlbum/?limit=${limit}&page=${page}&language=${language}`
        )
      ).data as IAlbums[];
      setTopAlbum(respose);
    };
    fetchTopAlbum();
  }, []);

  return (
    <>
      <div className=" sm:px-12 px-4 py-8 pb-20 ">
        <h1 className="  text-4xl ">Top Albums</h1>
        <SongCardContaier>
          {topAlbum.length <= 0 ? (
            <MoreSkeletonCard count={16} />
          ) : (
            topAlbum.map((items, idx) => <SongCards key={idx} songs={items} />)
          )}
        </SongCardContaier>
      </div>
    </>
  );
}
