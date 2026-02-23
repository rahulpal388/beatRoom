import { artistModel } from "../../db/schema/artist.js";
import { userModel } from "../../db/schema/user.js";
import { IArtists } from "../../types/artistType.js";



export async function saveLikedArtist(userId: string, artist: IArtists): Promise<boolean> {

    const savedArtist = await artistModel.findOneAndUpdate(
        { id: artist.id },
        { $set: { ...artist, isLiked: true } },
        { upsert: true, new: true }
    );

    if (!savedArtist) {
        throw new Error("Error while saving artist")
    }

    await userModel.findOneAndUpdate(
        { userId },
        { $addToSet: { "artists": savedArtist._id } }

    )

    return true;

}