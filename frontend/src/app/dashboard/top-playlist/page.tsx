"use client";
import { SongCards } from "@/components/dashboard/music/songCard";
import { SongCardContaier } from "@/components/dashboard/music/songCardContainer";
import { BASE_URL } from "@/lib/baseUrl";
import { IPlaylist } from "@/types/playlistType";
import { MoreSkeletonCard } from "@/ui/cardSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TopPlaylist() {
  const [topPlaylist, setTopPlaylist] = useState<IPlaylist[]>([]);

  useEffect(() => {
    const fetchTopPlaylist = async () => {
      const response = (await axios.get(`${BASE_URL}/playlist?limit=20&page=1`))
        .data as IPlaylist[];

      setTopPlaylist(response);
    };

    fetchTopPlaylist();
  }, []);
  return (
    <>
      <div className=" sm:px-12 px-4 py-8 pb-20 ">
        <h1 className="  text-4xl ">Top Playlist</h1>
        <SongCardContaier>
          {topPlaylist.length <= 0 ? (
            <MoreSkeletonCard count={16} />
          ) : (
            topPlaylist.map((items, idx) => (
              <SongCards
                key={idx}
                id={items.id}
                title={items.title}
                type={items.type}
                image={items.image}
                artist={items.subtitle}
                album_url=""
                song_url={items.perma_url}
              />
            ))
          )}
        </SongCardContaier>
      </div>
    </>
  );
}
