import axios from "axios";
import { getLikedAlbum } from "../album/getLikedAlbum.js";
import { retriveArtistAlbum } from "../album/retriveArtistAlbum.js";
import { getLikedPlaylist } from "../playlist/getLikedPlaylist.js";
import { retriveArtistPlaylist } from "../playlist/retriveArtistPlaylist.js";
import { getLikedSong } from "../songs/getLikedSong.js";
import { retriveSong } from "../songs/retriveSong.js";
import { ApiArtistInfo, IArtistInfo } from "../../types/artistType.js";
import { getLikedArtist } from "./getLikedArtist.js";


export async function artistInfo(token: string, userId: string | null): Promise<IArtistInfo | null> {

    try {
        // get the likedSong, LikedArtist, likedAlbum, likedPlaylist
        const [response, likedSong, likedAlbum, likedPlaylist, likedArtist] = await Promise.all([
            axios.get(
                `https://www.jiosaavn.com/api.php?__call=webapi.get&token=${token}&type=artist&p=0&n_song=50&n_album=50&sub_type=&category=&sort_order=&includeMetaTags=0&ctx=web6dot0&api_version=4&_format=json&_marker=0`
            ),
            getLikedSong(userId),
            getLikedAlbum(userId),
            getLikedPlaylist(userId),
            getLikedArtist(userId)
        ])

        const artistResponse = response.data as ApiArtistInfo;
        const result: IArtistInfo = {
            artistId: artistResponse.artistId,
            name: artistResponse.name,
            subtitle: artistResponse.subtitle,
            image: artistResponse.image.replace("150x150", "500x500"),
            follower_count: artistResponse.follower_count,
            type: artistResponse.type,
            isLiked: likedArtist.has(artistResponse.artistId),
            topSongs: retriveSong(artistResponse.topSongs, likedSong),
            topAlbums: retriveArtistAlbum(artistResponse.topAlbums, likedAlbum),
            latest_release: retriveArtistAlbum(artistResponse.latest_release, likedAlbum),
            dedicated_artist_playlist: retriveArtistPlaylist(artistResponse.dedicated_artist_playlist, likedPlaylist),
            featured_artist_playlist: retriveArtistPlaylist(artistResponse.featured_artist_playlist, likedPlaylist)
        }

        console.log(artistResponse.latest_release)
        return result;
    } catch {
        return null;
    }

}