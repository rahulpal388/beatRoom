import { SongCardContaier } from "./songCardContainer";
import { SongCards } from "./songCard";
import { useLikedLibraryStore } from "@/store/likedLibraryStore";
import { useAlbumStore } from "@/store/albumStore";

export function LikedAlbum() {
  const albumId = useLikedLibraryStore((s) => s.likedAlbum);
  const albumStore = useAlbumStore((s) => s.album);
  const album = albumId.map((x) => albumStore[x]);
  return (
    <>
      {album.length == 0 ? (
        <div className=" py-[4rem] flex items-center justify-center  ">
          <h1 className=" text-lg ">Album is empty!</h1>
        </div>
      ) : (
        <SongCardContaier>
          {album.map((song, idx) => (
            <SongCards key={idx} id={song.id} type={song.type} />
          ))}
        </SongCardContaier>
      )}
    </>
  );
}
