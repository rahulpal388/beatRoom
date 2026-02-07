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
                select: "id",
                options: { lean: true }
            })

        const songIdArray = user?.songs.map(song => song.id) ?? []

        return new Set([]);
    } catch (error) {
        console.log("error");
        return new Set([]);
    }
};
