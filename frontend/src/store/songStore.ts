import { ISong } from "@/types/songType"
import { create } from "zustand"
import { flattenRecord } from "./flattendRecordHelper";



/*
 # state
    1. songs => contain all the song
    2. trendingSong => contain only the id[]
    3. songBySameArtist => contain only the id[]
    4. listSongs => contain only the id[]

 # actions
    1. addSongs => add the song to songs state
    2. likeSong => make a api request to like the song and return response
    3. addTrendingSongs => update the songs state and add id[] to trendingSong state
    4. addListSongs => update the songs state and add id[] to listSong state
    5. addSongByArtist => update the songs state and add id[]  to songBySameArtist state
 */


type SongStoreType = {
    songs: Record<string, ISong>;
    trendingSongs: string[];
    songBySameArtist: string[];
    listSong: string[];
    actions: SongStoreActionsType
}


type SongStoreActionsType = {
    addSongs: (songs: ISong[]) => void;
    likeSong: (id: string) => void;
    addTrendingSong: (songs: ISong[]) => void;
    addListSong: (songs: ISong[]) => void
    addSongBySameArtist: (songs: ISong[]) => void;
}


export const useSongStore = create<SongStoreType>((set) => ({
    songs: {},
    trendingSongs: [],
    songBySameArtist: [],
    listSong: [],
    actions: {
        addSongs: (songs => {
            set((state) => {
                return { songs: flattenRecord(state.songs, songs) }
            })
        }),
        likeSong: (id => {
            set(state => {
                const getSong = state.songs[id];
                const updatedSong = {
                    ...state.songs,
                    [id]: { ...getSong, isLiked: !getSong.isLiked }
                }
                return { songs: updatedSong }
            })
        }),
        addTrendingSong: (songs => {
            set(state => {
                const songId = songs.map(song => song.id);

                return {
                    songs: flattenRecord(state.songs, songs),
                    trendingSongs: songId
                }
            })
        }),
        addSongBySameArtist: (songs => {
            set(state => {
                const songId = songs.map(song => song.id);
                return {
                    songs: flattenRecord(state.songs, songs),
                    songBySameArtist: songId
                }
            })
        }),
        addListSong: (songs => {
            set(state => {
                const songId = songs.map(song => song.id);
                return {
                    listSong: songId,
                    songs: flattenRecord(state.songs, songs)
                }
            })
        })
    }
}))