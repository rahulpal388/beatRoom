import { removeEntity } from "@/api/removeEntity";
import { saveEntity } from "@/api/saveEntity";
import { useToastNotification } from "@/context/toastNotificationContext";
import { useSongStore } from "@/store/songStore";
import { IAlbum } from "@/types/albumType";
import { IArtistAlbum } from "@/types/artistType";
import { IPlaylist } from "@/types/playlistType";
import { INewReleaseSong, ISong } from "@/types/songType";
import { Heart } from "lucide-react";

export function SaveItemHeart({
  songs,
  showHeart,
}: {
  songs: ISong | IPlaylist | IAlbum;
  showHeart: boolean;
}) {
  const { toastMessage } = useToastNotification();
  const likeSong = useSongStore((s) => s.actions.likeSong);
  return (
    <>
      <Heart
        size={30}
        className={`cursor-pointer   ${
          songs.isLiked
            ? "fill-red-800 stroke-0 block "
            : `${showHeart ? "block stroke-[1.2px] " : "hidden group-hover:block stroke-[1.2px]   "}`
        } `}
        onClick={async (e) => {
          e.stopPropagation();
          e.preventDefault();
          const { success, message } = await saveEntity(songs.type, songs);
          toastMessage({
            message,
            type: success ? "success" : "error",
          });
        }}
      />
    </>
  );
}
