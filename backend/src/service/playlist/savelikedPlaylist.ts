import { playlistModel } from "../../db/schema/playlist.js";
import { userModel } from "../../db/schema/user.js";
import { IPlaylist } from "../../types/playlistType.js";



export async function saveLikedPlaylist(userId: string, playlist: IPlaylist): Promise<boolean> {
    const savePlaylist = await playlistModel.insertOne({ ...playlist, isLiked: true });

    if (!playlist) {
        throw new Error("Error while saving playlist")
    }

    await userModel.findOneAndUpdate(
        { userId },
        { $addToSet: { "playlists": savePlaylist._id } }
    )

    return true

}