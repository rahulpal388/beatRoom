import { ISong } from "@/types/songType"
import { create } from "zustand"


type SongStoreType = {
    songs: Record<string, ISong>;
    displayedSong: string | null;
    trendingSongs: string[];
    songBySameArtist: string[];
    actions: SongStoreActionsType
}


type SongStoreActionsType = {
    addSongs: (s: ISong[]) => void;
    likeSong: (id: string) => void;
    addTrendingSong: (s: ISong[]) => void;
    addDisplayedSong: (s: ISong) => void;
    addSongBySameArtist: (s: ISong[]) => void;

}


export const useSongStore = create<SongStoreType>((set) => ({
    songs: {},
    displayedSong: null,
    trendingSongs: [],
    songBySameArtist: [],
    actions: {
        addSongs: (songs => {
            set((state) => {
                const updated = { ...state.songs };
                songs.forEach(song => {
                    updated[song.id] = song;
                })
                return { songs: updated }
            })
        }),
        likeSong: (id => {
            set(state => {
                const getSong = state.songs[id];
                const updatedSong = { id: { ...getSong, isLiked: !getSong.isLiked } }
                return { songs: updatedSong }
            })
        }),
        addTrendingSong: (songs => {
            set(state => {
                const updated = { ...state.songs };

                songs.forEach(song => {
                    updated[song.id] = song;
                })

                const songId = songs.map(song => song.id);

                return {
                    songs: updated,
                    trendingSongs: songId
                }
            })
        }),
        addDisplayedSong: (song => {
            set(state => {
                const updated = { ...state.songs };
                updated[song.id] = song;

                return {
                    songs: updated,
                    displayedSong: song.id
                }
            })
        }),
        addSongBySameArtist: (songs => {
            set(state => {
                const updated = { ...state.songs };

                songs.forEach(song => {
                    updated[song.id] = song
                })

                const songId = songs.map(song => song.id);
                return {
                    songs: updated,
                    songBySameArtist: songId
                }
            })
        })
    }
}))