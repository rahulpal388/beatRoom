import { IAlbum } from "@/types/albumType"
import { create } from "zustand"
import { flattenRecord } from "./flattendRecordHelper";
import { removeEntity } from "@/api/removeEntity";
import { saveALbum } from "@/api/album/saveAlbum";


/*

# state
    1. album => contain all the albums
    2. topAlbum => contain id refer to album state
    3. trendingAlbum => contain id refer to album state
    4. albumReco => contain id refer to album state 

# actions
    1. addAlbum 
    2. addTopAlbum
    3. addTrendingAlbum
    4. addAlbumReco

*/



type AlbumStoreType = {
    album: Record<string, IAlbum>;
    topAlbum: string[];
    trendingAlbum: string[];
    albumReco: string[]
    actions: AlbumStoreActionType
}


type AlbumStoreActionType = {
    addAlbum: (albums: IAlbum[]) => void;
    addTopAlbum: (albums: IAlbum[]) => void;
    likeAlbum: (album: IAlbum) => Promise<{ success: boolean; message: string }>;
    addTrendingAlbum: (albums: IAlbum[]) => void;
    addAlbumReco: (albums: IAlbum[]) => void;
}



export const useAlbumStore = create<AlbumStoreType>((set, get) => ({
    album: {},
    topAlbum: [],
    trendingAlbum: [],
    albumReco: [],
    actions: {
        addAlbum: (albums => {
            set(state => {
                return {
                    album: flattenRecord(state.album, albums)
                }

            })
        }),
        addAlbumReco: (albums => [
            set(state => {
                const ids = albums.map(x => x.id);
                return {
                    album: flattenRecord(state.album, albums),
                    albumReco: ids
                }
            })
        ]),
        addTopAlbum: (albums => [
            set(state => {
                const ids = albums.map(x => x.id);
                return {
                    album: flattenRecord(state.album, albums),
                    topAlbum: ids
                }
            })
        ]),
        likeAlbum: (async (album) => {
            const al = get().album[album.id];
            const { success, message } = al.isLiked ? await removeEntity(al.id, al.type) : await saveALbum(al);
            if (success) {
                set(state => {
                    return {
                        album: {
                            ...state.album,
                            [al.id]: { ...al, isLiked: !al.isLiked }
                        }
                    }
                })
            }
            return { success, message }
        }),
        addTrendingAlbum: (albums => [
            set(state => {
                const ids = albums.map(x => x.id);
                return {
                    album: flattenRecord(state.album, albums),
                    trendingAlbum: ids
                }
            })
        ])
    }
}))