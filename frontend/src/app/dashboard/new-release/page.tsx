"use client";
import { SongCards } from "@/components/dashboard/music/songCard";
import { SongCardContaier } from "@/components/dashboard/music/songCardContainer";
import { BASE_URL } from "@/lib/baseUrl";
import { ISong } from "@/types/songType";
import { MoreSkeletonCard } from "@/ui/cardSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";

export default function NewReleased() {
  const [newRelease, setNewRelease] = useState<ISong[]>([]);
  useEffect(() => {
    const fetchNewRelease = async () => {
      const limit = 20;
      const page = 1;
      const data = (
        await axios.get(
          `${BASE_URL}/song/newReleased/?limit=${limit}&page=${page}`,
          { withCredentials: true }
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
        <SongCardContaier>
          {newRelease.length <= 0 ? (
            <MoreSkeletonCard count={16} />
          ) : (
            newRelease.map((items, idx) => (
              <SongCards
                key={idx}
                songs={items}
                updateState={(id: string) => {
                  setNewRelease((prev) =>
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
