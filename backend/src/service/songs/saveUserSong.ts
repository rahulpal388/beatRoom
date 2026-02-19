import { userModel } from "../../db/schema/user.js";
import { songModel } from "../../db/schema/song.js";
import { ISong } from "../../types/songType.js";



export async function saveUserSong(userId: string, song: ISong): Promise<boolean> {


    const saveSong = await songModel.findOneAndUpdate(
        { id: song.id },
        {
            $set: { ...song, isLiked: true },
            $setOnInsert: {
                isPlaylist: false
            }
        },
        {
            upsert: true,
            new: true,
            projection: { _id: 1 }
        }
    )

    if (!saveSong?._id) {
        throw new Error("Song upsert failed")
    }

    await userModel.updateOne(
        { userId },
        { $addToSet: { "songs": saveSong._id } }
    )

    return true;


}