import { retriveSong } from "../songs/retriveSong.js";
import { APiSongsPlaylist, ISongsPlaylist } from "../../types/playlistType.js";



export function retriveSongPlaylist(data: APiSongsPlaylist, likedSong: Set<string>, likedPlaylist: Set<string>): ISongsPlaylist {

    return {
        id: data.id,
        title: data.title,
        subtitle: data.subtitle,
        type: data.type,
        image: data.image,
        language: data.list[0].language,
        perma_url: data.perma_url,
        list_count: data.list_count,
        isLiked: likedPlaylist.has(data.id),
        list: retriveSong(data.list, likedSong),
        more_info: {
            artists: data.more_info.artists.map((x) => ({
                id: x.id,
                name: x.name,
                type: x.type,
                role: x.role,
                perma_url: x.perma_url,
                image: x.image
            })),
        },
    };

}