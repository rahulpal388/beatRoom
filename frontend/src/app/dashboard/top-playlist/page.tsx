"use client";
import { SongCards } from "@/components/dashboard/music/songCard";
import { SongCardContaier } from "@/components/dashboard/music/songCardContainer";

import { IPlaylist } from "@/types/playlistType";
import { MoreSkeletonCard } from "@/ui/cardSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "@/lib/checkEnv";

export default function TopPlaylist() {
  const [topPlaylist, setTopPlaylist] = useState<IPlaylist[]>([]);

  useEffect(() => {
    const fetchTopPlaylist = async () => {
      const response = (
        await axios.get(`${api}/playlist?limit=20&page=1`, {
          withCredentials: true,
        })
      ).data as IPlaylist[];

      setTopPlaylist(response);
    };

    fetchTopPlaylist();
  }, []);
  return (
    <>
      <div className=" sm:px-12 px-4 py-8 pb-20 ">
        <h1 className="  text-[30px] pb-4 border-b-[1px] border-muted font-medium ">Top Playlist</h1>
        <SongCardContaier>
          {topPlaylist.length <= 0 ? (
            <MoreSkeletonCard count={16} />
          ) : (
            topPlaylist.map((items, idx) => (
              <SongCards
                key={idx}
                songs={items}
                updateState={(id: string) => {
                  setTopPlaylist((prev) =>
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
