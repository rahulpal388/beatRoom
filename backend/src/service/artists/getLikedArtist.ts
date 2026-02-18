import { userModel } from "../../db/schema/user.js";


export async function getLikedArtist(userId: string | null): Promise<Set<string>> {

    if (!userId) {
        return new Set([])
    }
    try {
        const user = await userModel.findOne({ userId })
            .populate({
                path: "artists",
                select: "id"
            })
        const idArr = user?.artists.map(x => String(x.id))
        console.log(idArr)
        return new Set(idArr);
    } catch (error) {
        return new Set([]);
    }

}