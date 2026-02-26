import { removeEntity } from "@/api/removeEntity";
import { saveEntity } from "@/api/saveEntity";
import { useToastNotification } from "@/context/toastNotificationContext";
import { IAlbum } from "@/types/albumType";
import { IArtistAlbum } from "@/types/artistType";
import { IPlaylist } from "@/types/playlistType";
import { INewReleaseSong, ISong } from "@/types/songType";
import { Heart } from "lucide-react";

export function SaveItemHeart({
  songs,
  showHeart,
  updateState,
}: {
  songs: ISong | IPlaylist | IAlbum | IArtistAlbum | INewReleaseSong;
  showHeart: boolean;
  updateState: (id: string) => void;
}) {
  const { toastMessage } = useToastNotification();

  return (
    <>
      <Heart
        size={30}
        className={`cursor-pointer   ${songs.isLiked
            ? "fill-red-800 stroke-0 block "
            : `${showHeart ? "block stroke-[1.2px] " : "hidden group-hover:block stroke-[1.2px]   "}`
          } `}
        onClick={async () => {
          const { success, message } = songs.isLiked
            ? await removeEntity(songs.id, songs.type)
            : await saveEntity(songs.type, songs);
          toastMessage({
            message,
            type: success ? "success" : "error",
          });
          if (success) {
            updateState(songs.id);
          }
        }}
      />
    </>
  );
}
