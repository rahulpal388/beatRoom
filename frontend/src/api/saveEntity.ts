import { useSongStore } from "@/store/songStore";
import { useAlbumStore } from "@/store/albumStore";
import { usePlaylistStore } from "@/store/playlistStore";
import { useLikedLibraryStore } from "@/store/likedLibraryStore";

export async function saveEntity(id: string, type: "song" | "playlist" | "album" | "userPlaylist"): Promise<{
    success: boolean;
    message: string;
}> {
    const { likeSong } = useSongStore.getState().actions
    const { likeAlbum } = useAlbumStore.getState().actions
    const { likePlaylist } = usePlaylistStore.getState().actions
    const { addLikedAlbum, addLikedPlaylist, addLikedSong, removeLikedAlbum, removeLikedPlaylist, removeLikedSong } = useLikedLibraryStore.getState().actions

    switch (type) {
        case "song": {
            const { success, message, isSongLiked } = await likeSong(id, type)
            if (success) {
                isSongLiked ? addLikedSong([id], false) : removeLikedSong(id);
            }
            return { success, message };
        }
        case "album": {
            const { success, message, isAlbumLiked } = await likeAlbum(id, type);
            if (success) {
                isAlbumLiked ? addLikedAlbum([id], false) : removeLikedAlbum(id)
            }
            return { success, message };
        }

        case "playlist": {
            const { success, message, isPlaylistLike } = await likePlaylist(id, type)
            if (success) {
                isPlaylistLike ? addLikedPlaylist([id], false) : removeLikedPlaylist(id);
            }
            return { message, success }
        }
        case "userPlaylist": {
            const { success, message, isPlaylistLike } = await likePlaylist(id, type)
            if (success) {
                isPlaylistLike ? addLikedPlaylist([id], false) : removeLikedPlaylist(id);
            }
            return { success, message }
        }


    }

}