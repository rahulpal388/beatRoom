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

    switch (type) {
        case "song": {
            return await likeSong(id, type)
        }
        case "album": {
            return await likeAlbum(id, type);
        }

        case "playlist": {
            return await likePlaylist(id, type)
        }
        case "userPlaylist": {
            return await likePlaylist(id, type)
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