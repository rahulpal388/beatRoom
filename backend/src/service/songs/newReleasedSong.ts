import axios from "axios";
import { getLikedAlbum } from "../album/getLikedAlbum.js";
import { getLikedSong } from "./getLikedSong.js";
import { ApiNewRelease, INewRelease } from "../../types/songType.js";



export async function newReleasedSong(userId: string | null, limit: string, page: string): Promise<INewRelease[]> {


    try {


        const [response, likedAlbum, likedSong] = await Promise.all([
            axios.get(
                `https://www.jiosaavn.com/api.php?__call=content.getAlbums&api_version=4&_format=json&_marker=0&n=${limit}&p=${page}&ctx=web6dot0`
            ),
            getLikedAlbum(userId),
            getLikedSong(userId),
        ]);

        const newSongs = response.data.data as ApiNewRelease[];
        const likedId = new Set([...likedAlbum, ...likedSong]);

        const result: INewRelease[] = newSongs.map(song => ({
            id: song.id,
            title: song.title,
            subtitle: song.subtitle,
            type: song.type,
            perma_url: song.perma_url,
            image: song.image.replace("150x150", "500x500"),
            language: song.language,
            play_count: song.play_count,
            isLiked: likedId.has(song.id),
            more_info: {
                album_id: song.more_info.album_id || "",
                album: song.more_info.album || "",
                album_url: song.more_info.album_url || "",
                duration: song.more_info.duration || "",
                encrypted_media_url: song.more_info.encrypted_media_url || "",
                artistMap: {
                    artists: song.more_info.artistMap.artists.map(artist => ({
                        id: artist.id,
                        name: artist.name,
                        image: artist.image,
                        perma_url: artist.perma_url,
                        role: artist.role,
                        type: artist.type,
                    }))
                },
                release_date: song.more_info.release_date,
            }
        }))
        return result;
    } catch (error) {
        return []
    }

}