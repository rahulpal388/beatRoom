import { LibraryLikeAlbum } from "@/components/dashboard/libraryLikeAlbum";
import { LikedAlbum } from "@/components/dashboard/music/likedAlbum";

export default async function MyLibraryAlbum() {
  return (
    <>
      <div>
        <div className=" flex items-center justify-center h-24 border-b-[1px] border-primary/30 ">
          <h1 className=" text-xl font-medium  ">My Album Library</h1>
        </div>
        <div>
          <LibraryLikeAlbum>
            <LikedAlbum />
          </LibraryLikeAlbum>
        </div>
      </div>
    </>
  );
}
