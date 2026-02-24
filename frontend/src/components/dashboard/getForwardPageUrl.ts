import { IAlbum } from "@/types/albumType";
import { IArtistAlbum } from "@/types/artistType";
import { IPlaylist } from "@/types/playlistType";
import { INewReleaseSong, ISong } from "@/types/songType";



export function getForwardPageUrl(songs: ISong | IPlaylist | IAlbum | IArtistAlbum | INewReleaseSong): string {

    switch (songs.type) {
        case "song": {
            console.log(songs)
            const songToken = songs.perma_url.split("/").at(-1) || "";
            const albumToken = songs.more_info.album_url.split("/").at(-1) || "";
            console.log(songToken, albumToken)
            return `/dashboard/song/${songToken}/${albumToken}`
        }
        case "album": {
            const albumToken = songs.perma_url.split("/").at(-1) || "";
            return `/dashboard/album/${albumToken}`

        }
        case "playlist": {
            const playlistToken = songs.perma_url.split("/").at(-1) || "";
            return `/dashboard/playlist/${playlistToken}`

        }
    }
}