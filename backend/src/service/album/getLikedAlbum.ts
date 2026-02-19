import { userModel } from "../../db/schema/user.js";

export const getLikedAlbum = async (userId: string | null): Promise<Set<string>> => {
    if (!userId) {
        return new Set([]);
    }

    try {
        const user = await userModel
            .findOne({ userId })
            .populate("albums");

        const idArr = user!.albums.map(x => String(x.id))
        console.log("liked album populate")
        console.log(idArr)

        return new Set(idArr);
    } catch {
        return new Set([]);
    }
};
