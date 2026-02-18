import { userModel } from "db/schema/user.js";
import { IAlbum } from "types/album.js";


export async function saveAlbum(userId: string): Promise<IAlbum[]> {

    const user = await userModel.findOne({ userId }).populate({
        path: "albums",
        select: "id title type perma_url image isLiked -_id"
    })

    if (!user) {
        throw new Error("Error find song")
    }

    return user.albums as unknown as IAlbum[];



}