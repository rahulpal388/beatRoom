import { userModel } from "../../db/schema/user.js";

export const getLikedPlaylist = async (
    userId: string | null
): Promise<Set<string>> => {
    if (!userId) {
        return new Set([]);
    }

    try {
        const user = await userModel
            .findOne({ userId })
            .populate({
                path: "playlists",
                select: "id"
            });
        const idArr = user!.playlists.map((x) => String(x.id))

        console.log(JSON.stringify(idArr));
        return new Set(idArr);
    } catch {
        return new Set([]);
    }
};
