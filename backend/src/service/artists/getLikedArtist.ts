import { userModel } from "../../db/schema/user.js";


export async function getLikedArtist(userId: string | null): Promise<Set<string>> {

    if (!userId) {
        return new Set([])
    }
    try {
        const user = await userModel.findOne({ userId })
            .populate("Artists")
        return new Set([]);
    } catch (error) {
        return new Set([]);
    }

}