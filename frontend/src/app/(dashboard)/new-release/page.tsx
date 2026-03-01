"use client";
import { getNewReleasedSong } from "@/api/song/newReleasedSong";
import { SongCards } from "@/components/dashboard/music/songCard";
import { SongCardContaier } from "@/components/dashboard/music/songCardContainer";
import { INewReleaseSong } from "@/types/songType";
import { MoreSkeletonCard } from "@/ui/cardSkeleton";
import { useEffect, useState } from "react";

export default function NewReleased() {
  const [newRelease, setNewRelease] = useState<INewReleaseSong[]>([]);
  useEffect(() => {
    const fetchNewRelease = async () => {
      const data = await getNewReleasedSong(20, 1);

      setNewRelease(data);
    };
    fetchNewRelease();
  }, []);

  return (
    <>
      <div className=" sm:px-12 px-4 py-8 pb-20 ">
        <h1 className="  text-4xl border-b-[1px] border-muted font-medium pb-4">
          New Release
        </h1>
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
                      x.id === id ? { ...x, isLiked: !x.isLiked } : x,
                    ),
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
