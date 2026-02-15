import { userModel } from "db/schema/user.js";
import { songModel } from "../../db/schema/song.js";



export async function removeUserSong(userId: string, songId: string): Promise<boolean> {


    const song = await songModel.findOne({ id: songId }, { _id: 1, isPlaylist: 1 });

    if (!song) {
        throw new Error("Error while finding song")
    }

    if (song.isPlaylist) {
        // update the song
        await songModel.findOneAndUpdate(
            { _id: song._id },
            { $set: { isLiked: false } }
        )
    } else {
        // delete the song
        await songModel.findOneAndDelete({ _id: song._id });
    }

    await userModel.findOneAndUpdate(
        { userId },
        { $pull: { "songs": song._id } }
    )

    return true

}