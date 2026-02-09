import { userModel } from "../../db/schema/user.js";
import { songModel } from "../../db/schema/song.js";
import { ISong } from "../../types/songType.js";
import { bulkSaveArtists } from "../artists/bulkSaveArtists.js";



export async function saveUserSong(userId: string, song: ISong) {

    try {
        const artistId = await bulkSaveArtists(song.more_info.artistMap.artists);
        if (!artistId) {
            return false;
        }
        const saveSong = await songModel.findByIdAndUpdate(
            { id: song.id },
            {
                $set: {
                    id: song.id,
                    title: song.title,
                    subtitle: song.subtitle,
                    type: song.type,
                    image: song.image,
                    perma_url: song.perma_url,
                    play_count: song.play_count,
                    language: song.language,
                    isLiked: song.isLiked,
                    "more_info.album_id": song.more_info.album_id,
                    "more_info.album": song.more_info.album,
                    "more_info.album_url": song.more_info.album_url,
                    "more_info.duration": song.more_info.duration,
                    "more_info.encrypted_media_url": song.more_info.encrypted_media_url,
                    "more_info.artistMap.artists": artistId,
                    "more_info.release_date": song.more_info.release_date,
                },
            },
            { new: true, upsert: true }
        );
        const user = await userModel.updateOne(
            { userId },
            {
                $addToSet: {
                    songs: saveSong._id
                }
            }
        )

        return (
            !!saveSong &&
            user.matchedCount === 1
        );
    } catch (error) {
        return false;
    }
}