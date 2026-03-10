"use client";
import { SongCardContaier } from "./songCardContainer";
import { SongCards } from "./songCard";
import { usePlaylistStore } from "@/store/playlistStore";
import { useLikedLibraryStore } from "@/store/likedLibraryStore";
import { Container } from "@/components/container";

export function LikedPlaylist() {
  const playlistId = useLikedLibraryStore((s) => s.likedPlaylist);
  const playlistStore = usePlaylistStore((s) => s.playlist);
  const playlist = playlistId.map((x) => playlistStore[x]);

  return (
    <>
      <Container>
        {playlist.length == 0 ? (
          <div className=" py-[4rem] flex items-center justify-center  ">
            <h1 className=" text-lg "> Playlist is empty!</h1>
          </div>
        ) : (
          <SongCardContaier className="px-4">
            {playlist.map((song, idx) => (
              <SongCards
                key={idx}
                id={song.id}
                type={song.type}
                className=" w-full "
              />
            ))}
          </SongCardContaier>
        )}
      </Container>
    </>
  );
}
