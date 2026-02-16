import { artistModel } from "../../db/schema/artist.js";
import { userModel } from "../../db/schema/user.js";



export async function removeLikedArtist(userId: string, id: string): Promise<boolean> {

    const removedArtist = await artistModel.findOneAndDelete({ id }, { projection: { _id: 1 } })


    if (!removedArtist) {
        throw new Error("Can't find artist")
    }

    await userModel.findOneAndUpdate(
        { userId },
        { $pull: { "artists": removedArtist._id } }
    )

    return true;
}