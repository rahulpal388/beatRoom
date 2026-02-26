import { songModel } from "../../db/schema/song.js";
import { ISong } from "../../types/songType.js";
import { userPlaylistModel } from "../../db/schema/userPlaylist.js";



export async function saveSongToPlaylist(userId: string, id: string, songs: ISong): Promise<boolean> {

    try {

        const savedSong = await songModel.findOneAndUpdate(
            { id: songs.id },
            {
                $set: { ...songs, isPlaylist: true }
            },
            { upsert: true, new: true }
        )

        if (!savedSong) {
            throw new Error("Error adding song to playlist")
        }

        await userPlaylistModel.findOneAndUpdate(
            { id },
            { $addToSet: { songs: savedSong._id } }
        )
        return true;
    } catch {
        return false;
    }

}