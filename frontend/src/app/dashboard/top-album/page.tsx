"use client";

import { SongCards } from "@/components/dashboard/music/songCard";
import { SongCardContaier } from "@/components/dashboard/music/songCardContainer";
import { api } from "@/lib/checkEnv";
import { IAlbum } from "@/types/albumType";
import { MoreSkeletonCard } from "@/ui/cardSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TopAlbum() {
  const [topAlbum, setTopAlbum] = useState<IAlbum[]>([]);

  useEffect(() => {
    const fetchTopAlbum = async () => {
      const limit = 20;
      const page = 0;
      const language = "hindi";
      const respose = (
        await axios.get(
          `${api}/album/trendingAlbum/?limit=${limit}&page=${page}&language=${language}`,
          { withCredentials: true }
        )
      ).data as IAlbum[];
      setTopAlbum(respose);
      console.log(respose);
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
            topAlbum.map((items, idx) => (
              <SongCards
                key={idx}
                songs={items}
                updateState={(id: string) => {
                  setTopAlbum((prev) =>
                    prev.map((x) =>
                      x.id === id ? { ...x, isLiked: !x.isLiked } : x
                    )
                  );
                }}
              />
            ))
          )}
        </SongCardContaier>
      </div>
    </>
  );
}
