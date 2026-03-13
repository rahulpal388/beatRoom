import { saveEntity } from "@/api/saveEntity";
import { useAuth } from "@/context/authContext";
import { useToastNotification } from "@/context/toastNotificationContext";
import { IAlbum } from "@/types/albumType";
import { IPlaylist } from "@/types/playlistType";
import { ISong } from "@/types/songType";
import { Heart } from "lucide-react";

export function SaveItemHeart({
  songs,
  showHeart,
}: {
  songs: ISong | IPlaylist | IAlbum;
  showHeart: boolean;
}) {
  const { toastMessage } = useToastNotification();
  const { isAuthenticated, currentUser } = useAuth();
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
          console.log(isAuthenticated);
          console.log(currentUser);
          const { success, message } = await saveEntity(songs.id, songs.type);
          toastMessage({
            message,
            type: success ? "success" : "error",
          });
        }}
      />
    </>
  );
}
