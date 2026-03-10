import { ISearchAlbum, ISearchArtist, ISearchPlaylist, ISearchSong } from "@/types/searchType"
import { create } from "zustand"

type SearchStoreType = {
    albums: Record<string, ISearchAlbum>;
    songs: Record<string, ISearchSong>;
    playlists: Record<string, ISearchPlaylist>;
    artists: Record<string, ISearchArtist>;
    actions: SearchStoreActionType
}


type SearchStoreActionType = {
    addAlbums(album: ISearchAlbum[]): void;
    addSongs(song: ISearchSong[]): void;
    addPlaylists(playlist: ISearchPlaylist[]): void;
    addArtists(artist: ISearchArtist[]): void;
}


export const useSearchStore = create<SearchStoreType>(set => ({
    albums: {},
    songs: {},
    playlists: {},
    artists: {},
    actions: {
        addAlbums: (album => {
            set(state => {
                const albumRecord = album.reduce<Record<string, ISearchAlbum>>((al, x) => {
                    al[x.id] = x
                    return al
                }, {})

                return {
                    albums: albumRecord
                }
            })
        }),
        addSongs: (song => {
            set(state => {
                const songRecord = song.reduce<Record<string, ISearchSong>>((al, x) => {
                    al[x.id] = x
                    return al
                }, {})

                return {
                    songs: songRecord
                }
            })
        }),
        addArtists: (aritst => {
            set(state => {
                const artistRecord = aritst.reduce<Record<string, ISearchArtist>>((al, x) => {
                    al[x.id] = x
                    return al
                }, {})

                return {
                    artists: artistRecord
                }
            })
        }),
        addPlaylists: (playlist => {
            const playlistRecord = playlist.reduce<Record<string, ISearchPlaylist>>((al, x) => {
                al[x.id] = x
                return al
            }, {})
            set({
                playlists: playlistRecord
            }
            )
        })
    }
}))