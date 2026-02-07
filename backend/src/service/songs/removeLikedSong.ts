import { songModel } from "../../db/schema/song.js";



export async function removeLikedSong(userId: string, songId: string): Promise<boolean> {

    try {

        const song = await songModel.findOne({ id: songId })
            .populate({
                path: "more_info.artistMap.artists",
                options: { lean: true }
            })

        if (!song) {
            return false;
        }

        if (song.isPlaylist) {
            // if true then just update isLiked to false
            await songModel.updateOne({ _id: song._id }, {
                $set: { isLiked: false }
            })
            return true;
        } else {
            // delete the song and if artist is isLiked false delete that also

            const artistObjectId = song.more_info?.artistMap?.artists;

        }
        return true;
    } catch (error) {
        return false;
    }

}