import { useSongStore } from "@/store/songStore";
import { ShowItemsDetails } from "./music/showSongDetail";
import { useDisplayedItemStore } from "@/store/displayedItemStore";
import { useAlbumStore } from "@/store/albumStore";
import { usePlaylistStore } from "@/store/playlistStore";

export function ShowDetailsContainer() {
  const ref = useDisplayedItemStore((s) => s.displayedItem);

  const song = useSongStore((s) =>
    ref?.type === "song" ? s.songs[ref?.id] : null,
  );
  const album = useAlbumStore((s) =>
    ref?.type === "album" ? s.album[ref?.id] : null,
  );
  const playlist = usePlaylistStore((s) =>
    ref?.type === "playlist" ? s.playlist[ref?.id] : null,
  );

  const item = song || album || playlist;

  if (!ref) {
    return null;
  }
  if (!item) {
    return null;
  }

  return <ShowItemsDetails items={item} />;
}
