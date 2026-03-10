import { IAlbum } from "@/types/albumType";
import { IArtists } from "@/types/artistType";
import { IPlaylist } from "@/types/playlistType";
import { ISong } from "@/types/songType";
import { create } from "zustand"



type LikedLibraryStoreType = {
    likedSong: string[];
    likedAlbum: string[];
    likedPlaylist: string[];
    actions: LikedLibraryStoreActionType
}


type LikedLibraryStoreActionType = {
    addLikedSong(songs: ISong[] | string[], isRemove: boolean): void;
    addLikedAlbum(songs: IAlbum[] | string[], isRemove: boolean): void;
    addLikedPlaylist(songs: IPlaylist[] | string[], isRemove: boolean): void;
    removeLikedSong(id: string): void;
    removeLikedAlbum(id: string): void;
    removeLikedPlaylist(id: string): void;
}



export const useLikedLibraryStore = create<LikedLibraryStoreType>((set, get) => ({
    likedAlbum: [],
    likedSong: [],
    likedPlaylist: [],
    actions: {
        addLikedAlbum: ((album, isRemove) => {
            set(state => {
                const albumId = typeof album[0] === "string" ? (album as string[]) : (album as IAlbum[]).map(x => x.id);

                return {
                    likedAlbum: isRemove ? [...albumId] : [...state.likedAlbum, ...albumId]
                }

            })
        }),
        addLikedPlaylist: ((playlist, isRemove) => {
            set(state => {
                const playlistId = typeof playlist[0] === "string" ? (playlist as string[]) : (playlist as IPlaylist[]).map(x => x.id);
                return {
                    likedPlaylist: isRemove ? [...playlistId] : [...state.likedPlaylist, ...playlistId]
                }
            })
        }),
        addLikedSong: ((song, isRemove) => {
            set(state => {
                const songId: string[] = typeof song[0] === "string" ? (song as string[]) : (song as ISong[]).map(x => x.id)

                return {
                    likedSong: isRemove ? [...songId] : [...state.likedSong, ...songId]
                }
            })
        }),
        removeLikedAlbum: (id => {
            const album = get().likedAlbum;
            const updatedAlbumId = album.filter(x => x !== id);

            set({
                likedAlbum: updatedAlbumId
            })
        }),
        removeLikedPlaylist: (id => {
            const playlist = get().likedPlaylist;
            const updatedPlaylistId = playlist.filter(x => x !== id);
            set({
                likedPlaylist: updatedPlaylistId
            })
        }),
        removeLikedSong: (id => {
            const song = get().likedSong;
            const updatedSongId = song.filter(x => x !== id);
            set({
                likedSong: updatedSongId
            })
        }
        )
    }
}))
