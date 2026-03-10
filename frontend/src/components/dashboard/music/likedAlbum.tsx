"use client";
import { SongCardContaier } from "./songCardContainer";
import { SongCards } from "./songCard";
import { useLikedLibraryStore } from "@/store/likedLibraryStore";
import { useAlbumStore } from "@/store/albumStore";
import { Container } from "@/components/container";

export function LikedAlbum() {
  const albumId = useLikedLibraryStore((s) => s.likedAlbum);
  const albumStore = useAlbumStore((s) => s.album);
  const album = albumId.map((x) => albumStore[x]);
  return (
    <>
      <Container>
        {album.length == 0 ? (
          <div className=" py-[4rem] flex items-center justify-center  ">
            <h1 className=" text-lg ">Album is empty!</h1>
          </div>
        ) : (
          <SongCardContaier className=" px-4 ">
            {album.map((song, idx) => (
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
