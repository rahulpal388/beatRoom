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
    addLikedSong(songs: ISong[]): void;
    addLikedAlbum(songs: IAlbum[]): void;
    addLikedPlaylist(songs: IPlaylist[]): void;
}



export const useLikedLibraryStore = create<LikedLibraryStoreType>(set => ({
    likedAlbum: [],
    likedSong: [],
    likedPlaylist: [],
    actions: {
        addLikedAlbum: (album => {
            set(state => {
                const albumId = album.map(x => x.id);

                return {
                    likedAlbum: [...state.likedAlbum, ...albumId]
                }

            })
        }),
        addLikedPlaylist: (playlist => {
            set(state => {
                const playlistId = playlist.map(x => x.id);
                return {
                    likedPlaylist: [...state.likedPlaylist, ...playlistId]
                }
            })
        }),
        addLikedSong: (song => {
            set(state => {
                const songId = song.map(x => x.id);
                return {
                    likedSong: [...state.likedSong, ...songId]
                }
            })
        })
    }
}))
