import { playlistModel } from "../../db/schema/playlist.js";
import { userModel } from "../../db/schema/user.js";



export async function removeLikedPlaylist(userId: string, id: string): Promise<boolean> {
    const playlist = await playlistModel.findOneAndDelete({ id }, { projection: { _id: 1 } })

    if (!playlist) {
        throw new Error("Can't find playlist")
    }
    await userModel.findOneAndUpdate(
        { userId },
        { $addToSet: { "playlists": playlist._id } }
    )

    return true;
}