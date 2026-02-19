import { userModel } from "../../db/schema/user.js";

export const getLikedSong = async (userId: string | null): Promise<Set<string>> => {
    if (!userId) {
        return new Set([]);
    }

    try {
        const user = await userModel
            .findOne({ userId })
            .populate({
                path: "songs",
                select: "id isLiked -_id ",
            })

        const songId = user!.songs as unknown as { id: string, isLiked: boolean }[]
        const idArr = songId.filter(x => x.isLiked).map(x => x.id)
        console.log("saved song id")
        console.log(idArr)
        return new Set(idArr);
    } catch (error) {
        console.log("error");
        return new Set([]);
    }
};
