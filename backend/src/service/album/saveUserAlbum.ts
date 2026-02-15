import { albumModel } from "db/schema/album.js";
import { userModel } from "db/schema/user.js";
import { IAlbum } from "types/album.js";



export async function saveUserAlbum(userId: string, album: IAlbum): Promise<boolean> {

    const saveAlbum = await albumModel.insertOne({ ...album, isLiked: true });

    if (!saveAlbum) {
        throw new Error("Error while saving album")
    }

    await userModel.findOneAndUpdate(
        { userId },
        { $addToSet: { 'albums': saveAlbum._id } }
    )
    return true;

}