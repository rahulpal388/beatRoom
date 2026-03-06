import { ISong } from "@/types/songType"
import { create } from "zustand"
import { flattenRecord } from "./flattendRecordHelper";
import { removeEntity } from "@/api/removeEntity";
import { saveEntity } from "@/api/saveEntity";
import { saveSong } from "@/api/song/saveSong";



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
    likeSong: (song: ISong) => Promise<{ success: boolean; message: string }>;
    addTrendingSong: (songs: ISong[]) => void;
    addListSong: (songs: ISong[]) => void
    addSongBySameArtist: (songs: ISong[]) => void;
}

const MAX_SONG_LIST = 50;

export const useSongStore = create<SongStoreType>((set, get) => ({
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
        likeSong: (async (s) => {
            const song = get().songs[s.id];
            const { success, message } = song.isLiked
                ? await removeEntity(song.id, song.type)
                : await saveSong(song);

            if (success) {
                set((state => {
                    return {
                        songs: {
                            ...state.songs,
                            [song.id]: { ...song, isLiked: !song.isLiked }
                        }
                    }
                }))

            }
            return { success, message }
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
                const songId = songs.slice(0, MAX_SONG_LIST).map(song => song.id);
                return {
                    listSong: songId,
                    songs: flattenRecord(state.songs, songs.slice(0, MAX_SONG_LIST))
                }
            })
        })
    }
}))