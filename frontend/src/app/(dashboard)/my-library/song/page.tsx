import { LibraryLikeSong } from "@/components/dashboard/libraryLikeSong";
import { LikedSong } from "@/components/dashboard/music/likedSong";

export default function MyLibrarySong() {
  return (
    <>
      <div>
        <div className=" flex items-center justify-center h-24 border-b-[1px] border-primary/30 ">
          <h1 className=" text-xl font-medium  ">My Song Library</h1>
        </div>
        <div>
          <LibraryLikeSong>
            <LikedSong />
          </LibraryLikeSong>
        </div>
      </div>
    </>
  );
}
