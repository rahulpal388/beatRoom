import { ISong } from "types/songType.js";
import { userModel } from "../../db/schema/user.js";
import { IPlaylist, ISongsPlaylist, IUserSongPlaylist } from "../../types/playlistType.js";



export async function retriveUserSongPlaylist(userId: string, id: string): Promise<ISongsPlaylist | null> {

    const userPlaylist = await userModel.findOne({ userId },).populate(
        {
            path: "user_playlist",
            select: "-_id -__v",
            populate: {
                path: "songs",
                select: "-_id -__v"
            }
        }
    )

    if (!userPlaylist) {
        throw new Error("Error finding the user saved details")
    }
    const playlist = userPlaylist.user_playlist as unknown as IUserSongPlaylist[];
    // return userPlaylist.user_playlist;
    const result = playlist.filter(x => x.id === id);
    console.log(result[0]);
    return result.length === 0 ? null : {
        id: result[0].id,
        title: result[0].title,
        subtitle: result[0].subtitle,
        type: result[0].type,
        image: result[0].image,
        perma_url: result[0].perma_url,
        isLiked: result[0].isLiked,
        list_count: result[0].songs.length.toString(),
        language: "",
        list: result[0].songs,
        more_info: {
            artists: result[0].songs[0].more_info.artistMap.artists
        }
    };

}