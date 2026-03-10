"use client";
import { SongCardContaier } from "./songCardContainer";
import { SongCards } from "./songCard";
import { useLikedLibraryStore } from "@/store/likedLibraryStore";
import { useSongStore } from "@/store/songStore";
import { Container } from "@/components/container";

export function LikedSong() {
  const songId = useLikedLibraryStore((s) => s.likedSong);
  const songsStore = useSongStore((s) => s.songs);
  const songs = songId.map((x) => songsStore[x]);

  return (
    <>
      <Container>
        {songs.length == 0 ? (
          <div className=" py-[4rem] flex items-center justify-center  ">
            <h1 className=" text-lg ">Song is empty!</h1>
          </div>
        ) : (
          <div>
            <SongCardContaier className="px-4">
              {songs.map((song, idx) => (
                <SongCards
                  key={idx}
                  id={song.id}
                  type={song.type}
                  className="w-full"
                />
              ))}
            </SongCardContaier>
          </div>
        )}
      </Container>
    </>
  );
}
