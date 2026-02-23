import { albumModel } from "../../db/schema/album.js";
import { userModel } from "../../db/schema/user.js";



export async function removeUserAlbum(userId: string, id: string): Promise<boolean> {
    console.log(`album id is => ${id}`)
    const album = await albumModel.findOneAndDelete(
        { id },
        { projection: { _id: 1 } }
    )
    console.log(album)

    if (!album) {
        throw new Error("Album not found");
    }

    await userModel.findOneAndUpdate(
        { userId },
        { $pull: { "albums": album._id } }
    )

    return true;
}