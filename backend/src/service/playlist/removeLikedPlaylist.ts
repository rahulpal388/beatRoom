import { userPlaylistModel } from "db/schema/userPlaylist.js";
import { playlistModel } from "../../db/schema/playlist.js";
import { userModel } from "../../db/schema/user.js";



export async function removeLikedPlaylist(userId: string, id: string, type: string): Promise<boolean> {

    if (type == "playlist") {
        const playlist = await playlistModel.findOneAndDelete({ id }, { projection: { _id: 1 } })

        if (!playlist) {
            throw new Error("Can't find playlist")
        }
        await userModel.findOneAndUpdate(
            { userId },
            { $pull: { "playlists": playlist._id } }
        )
    }

    if (type === "userPlaylist") {
        const playlist = await userPlaylistModel.findOneAndDelete({ id }, { projection: { _id: 1 } })


        if (!playlist) {
            throw new Error("Can't find playlist")
        }
        await userModel.findOneAndUpdate(
            { userId },
            { $pull: { "user_playlist": playlist._id } }
        )
    }

    return true;
}