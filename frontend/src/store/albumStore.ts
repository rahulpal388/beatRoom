import { IAlbum } from "@/types/albumType"
import { create } from "zustand"
import { flattenRecord } from "./flattendRecordHelper";


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
    addTrendingAlbum: (albums: IAlbum[]) => void;
    addAlbumReco: (albums: IAlbum[]) => void;
}



export const useAlbumStore = create<AlbumStoreType>((set) => ({
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