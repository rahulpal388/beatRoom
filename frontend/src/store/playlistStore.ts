import { IPlaylist } from "@/types/playlistType"
import { create } from "zustand"
import { flattenRecord } from "./flattendRecordHelper";
import { removeEntity } from "@/api/removeEntity";
import { savePlaylist } from "@/api/playlist/savePlaylist";



/*

# state
    1. playlist ( playlist type ) => contain all the playlist
    2. topPlaylist => contain id refer to playlist state
    3. playlistReco => contain id refer to playlist state
    4. trendingPlaylist => contain id refer to playlist state
# actions
    1. addPlaylist => update the playlist state
    2. addTopPlaylist => update the playlist state and add ids to topPlaylist
    3. addPlaylistReco => update the playlist state and add ids to playlistReco 
    4. addTrendingPlaylist => update the playlist state and add ids to trendingPlaylist
*/



type PlaylistStoreType = {
    playlist: Record<string, IPlaylist>;
    topPlaylist: string[];
    playlistReco: string[];
    trendingPlaylist: string[];
    actions: PlaylistStoreActionType
}

type PlaylistStoreActionType = {
    addPlaylist: (playlists: IPlaylist[]) => void;
    addTopPlaylist: (playlists: IPlaylist[]) => void;
    addPlaylistReco: (playlists: IPlaylist[]) => void;
    likePlaylist: (playlist: IPlaylist) => Promise<{ success: boolean; message: string }>;
    addTrendingPlaylist: (playlists: IPlaylist[]) => void;
}




export const usePlaylistStore = create<PlaylistStoreType>((set, get) => ({
    playlist: {},
    topPlaylist: [],
    playlistReco: [],
    trendingPlaylist: [],
    actions: {
        addPlaylist: (playlists => {
            set(state => {
                return { playlist: flattenRecord(state.playlist, playlists) }
            })
        }),
        addPlaylistReco: (playlists => {
            set(state => {
                const id = playlists.map(x => x.id);
                return {
                    playlistReco: id,
                    playlist: flattenRecord(state.playlist, playlists)
                }
            })
        }),
        likePlaylist: (async (playlist) => {
            const p = get().playlist[playlist.id]
            const { success, message } = p.isLiked
                ? await removeEntity(p.id, p.type)
                : await savePlaylist(p);

            if (success) {
                set(state => {
                    return {
                        playlist: {
                            ...state.playlist,
                            [p.id]: { ...p, isLiked: !p.isLiked }
                        }
                    }
                })
            }
            return { success, message }
        }),
        addTopPlaylist: (playlists => {
            set(state => {
                const id = playlists.map(x => x.id);
                return {
                    topPlaylist: id,
                    playlist: flattenRecord(state.playlist, playlists)
                }
            })
        }),
        addTrendingPlaylist: (playlists => {
            set(state => {
                const id = playlists.map(x => x.id);
                return {
                    trendingPlaylist: id,
                    playlist: flattenRecord(state.playlist, playlists)
                }
            })
        })
    }
}))
