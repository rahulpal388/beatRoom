import { generatePlaylistId } from "../../utils/generatePlaylistId.js";
import { songModel } from "../../db/schema/song.js";
import { userModel } from "../../db/schema/user.js";
import { userPlaylistModel } from "../../db/schema/userPlaylist.js";
import { ISong } from "../../types/songType.js";



export async function savePlaylist(userId: string, title: string, subtitle: string, songs: ISong[]): Promise<boolean> {

    try {

        const songsOperations = songs.map(x => ({
            updateOne: {
                filter: { id: x.id },
                update: { $set: { ...x, isPlaylist: true } },
                upsert: true
            }
        }))

        await songModel.bulkWrite(songsOperations, { ordered: true })

        const savedPlaylistSong = await songModel.find({
            id: { $in: songs.map(x => x.id), },
            isPlaylist: true
        })

        if (!savedPlaylistSong) {
            throw new Error("Error saving user playlist")

        }
        const playlistId = generatePlaylistId();
        const playlist = await userPlaylistModel.create({
            id: playlistId,
            title,
            subtitle,
            isLiked: true,
            songs: savedPlaylistSong.map(x => x._id)
        })

        await userModel.findOneAndUpdate(
            { userId },
            { $addToSet: { user_playlist: playlist._id } }
        )

        return true;

    } catch {
        return false
    }

}