import { ISong } from "@/types/songType";
import { saveSong } from "./song/saveSong"
import { saveALbum } from "./album/saveAlbum";
import { IAlbum } from "@/types/albumType";
import { savePlaylist } from "./playlist/savePlaylist";
import { IPlaylist } from "@/types/playlistType";
import { saveArtist } from "./artist/saveArtist";
import { IArtists } from "@/types/artistType";
import { saveUserPlaylist } from "./playlist/saveUserPlaylist";
import { useSongStore } from "@/store/songStore";
import { useAlbumStore } from "@/store/albumStore";
import { usePlaylistStore } from "@/store/playlistStore";
import { useLikedLibraryStore } from "@/store/likedLibraryStore";
import { removeAllListeners } from "process";
import { s } from "motion/react-client";

type IUserPlaylistType = {
    title: string;
    subtitle: string;
    songs: ISong[]
}
// type IEntityDataMap = {
//     song: ISong;
//     album: IAlbum;
//     playlist: IPlaylist;
//     artist: IArtists;
//     userPlaylist: IUserPlaylistType
// }

export async function saveEntity(id: string, type: "song" | "playlist" | "album" | "userPlaylist" | "artist"): Promise<{
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
            return { success, message }
        }
        case "artist": {
            // return await saveArtist(data as IArtists)
            return {
                success: false,
                message: "saving artist is remeaning"
            }
        }

    }

}