import { ISong } from "@/types/songType";
import { saveSong } from "./song/saveSong"
import { saveALbum } from "./album/saveAlbum";
import { IAlbum } from "@/types/albumType";
import { savePlaylist } from "./playlist/savePlaylist";
import { IPlaylist } from "@/types/playlistType";
import { saveArtist } from "./artist/saveArtist";
import { IArtists } from "@/types/artistType";
import { saveUserPlaylist } from "./playlist/saveUserPlaylist";

type IUserPlaylistType = {
    title: string;
    subtitle: string;
    songs: ISong[]
}
type IEntityDataMap = {
    song: ISong;
    album: IAlbum;
    playlist: IPlaylist;
    artist: IArtists;
    userPlaylist: IUserPlaylistType
}

type ISaveEntity = "song" | "album" | "playlist" | "artist" | "userPlaylist"
export async function saveEntity<T extends ISaveEntity>(type: T, data: IEntityDataMap[T]): Promise<{
    success: boolean;
    message: string;
}> {

    try {
        switch (type) {
            case "song": {
                await saveSong(data as ISong)
                break;
            }
            case "album": {
                await saveALbum(data as IAlbum);
                break;
            }

            case "playlist": {
                await savePlaylist(data as IPlaylist)
                break;
            }
            case "artist": {
                await saveArtist(data as IArtists)
                break;
            }
            case "userPlaylist": {
                const playlistData = data as IUserPlaylistType;
                await saveUserPlaylist(playlistData.title, playlistData.subtitle, playlistData.songs)
                break;
            }
        }
        return {
            success: true,
            message: `${type} Saved`
        }
    } catch {
        return {
            success: false,
            message: "Error Saving"
        }

    }
}