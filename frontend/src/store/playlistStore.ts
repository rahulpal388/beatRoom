import { IPlaylist } from "@/types/playlistType"
import { create } from "zustand"
import { flattenRecord } from "./flattendRecordHelper";
import { removeEntity } from "@/api/removeEntity";
import { savePlaylist } from "@/api/playlist/savePlaylist";
import { IArtistPlaylist } from "@/types/artistType";



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
    dedicatedArtistPlaylist: string[];
    featuredArtistPlaylist: string[];
    actions: PlaylistStoreActionType
}

type PlaylistStoreActionType = {
    addPlaylist: (playlists: IPlaylist[]) => void;
    addTopPlaylist: (playlists: IPlaylist[]) => void;
    addPlaylistReco: (playlists: IPlaylist[]) => void;
    likePlaylist: (id: string, type: "playlist" | "userPlaylist") => Promise<{ success: boolean; message: string; isPlaylistLike: boolean }>;
    addTrendingPlaylist: (playlists: IPlaylist[]) => void;
    addDedicatedArtistPlaylist: (artistPlaylist: IArtistPlaylist[]) => void
    addFeaturedArtistPlaylist: (artistPlaylist: IArtistPlaylist[]) => void
}




export const usePlaylistStore = create<PlaylistStoreType>((set, get) => ({
    playlist: {},
    topPlaylist: [],
    playlistReco: [],
    trendingPlaylist: [],
    dedicatedArtistPlaylist: [],
    featuredArtistPlaylist: [],
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
        likePlaylist: (async (id, type) => {
            if (type === "userPlaylist") {

                return {
                    success: false,
                    message: "complete the userPlaylist saving",
                    isPlaylistLike: false
                }
            }
            const p = get().playlist[id]
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
            return { success, message, isPlaylistLike: !p.isLiked }
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
        addDedicatedArtistPlaylist: (artistPlaylist => {
            const playlist = artistPlaylist.map(({ more_info, ...x }) => x);
            const addPlaylist = get().actions.addPlaylist;
            addPlaylist(playlist);
            const ids = playlist.map(x => x.id);

            set({
                dedicatedArtistPlaylist: ids
            })
        }),
        addFeaturedArtistPlaylist: (artistPlaylist => {
            const playlist = artistPlaylist.map(({ more_info, ...x }) => x);
            const addPlaylist = get().actions.addPlaylist;
            addPlaylist(playlist);
            const ids = playlist.map(x => x.id);

            set({
                featuredArtistPlaylist: ids
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
