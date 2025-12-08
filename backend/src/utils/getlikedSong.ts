import { userModel } from "../db/schema/user.js";

export const getLikedSong = async (userId: string): Promise<Set<string>> => {
  if (userId.length === 0) {
    return new Set([]);
  }

  try {
    const song = await userModel
      .findOne({ userId })
      .select("likes.songs")
      .populate("likes.songs");
    console.log(song);
    const idArr = song?.likes?.songs.map((x) => String(x.id)) || [];

    return new Set(idArr);
  } catch (error) {
    console.log("error");
    return new Set([]);
  }
};
