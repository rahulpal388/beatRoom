import { userModel } from "db/schema/user.js";
import { IPlaylist } from "types/playlistType.js";



export async function retriveUserSongPlaylist(userId: string, id: string): Promise<IPlaylist | null> {

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
    const playlist = userPlaylist.user_playlist as unknown as IPlaylist[];
    // return userPlaylist.user_playlist;
    const result = playlist.filter(x => x.id === id);
    return result.length === 0 ? null : result[0];

}