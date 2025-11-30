"use client";
import { SongCards } from "@/components/dashboard/music/songCard";
import { BASE_URL } from "@/lib/baseUrl";
import { INewRelease } from "@/types/songType";
import { MoreSkeletonCard } from "@/ui/cardSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";

export default function NewReleased() {
  const [newRelease, setNewRelease] = useState<INewRelease[]>([]);
  useEffect(() => {
    const fetchNewRelease = async () => {
      const limit = 20;
      const page = 1;
      const data = (
        await axios.get(
          `${BASE_URL}/song/newReleased/?limit=${limit}&page=${page}`
        )
      ).data;
      setNewRelease(data);
      console.log(data);
    };
    fetchNewRelease();
  }, []);

  return (
    <>
      <div className=" sm:px-12 px-4 py-8 pb-20 ">
        <h1 className="  text-4xl ">New Release</h1>
        <div className=" mt-4 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8 ">
          {newRelease.length <= 0 ? (
            <MoreSkeletonCard count={16} />
          ) : (
            newRelease.map((items, idx) => (
              <SongCards
                key={idx}
                id={items.id}
                title={items.title}
                type={items.type}
                image={items.image}
                artist={items.more_info.artistMap.artists
                  .map((x) => x.name)
                  .join(", ")}
                song_url={items.perma_url}
                album_url={items.more_info.album_url || ""}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
