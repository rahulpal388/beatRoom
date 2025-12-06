import { userModel } from "../db/schema/user.js";

export const getLikedPlaylist = async (
  userId: string
): Promise<Set<string>> => {
  if (userId.length === 0) {
    return new Set([]);
  }

  try {
    const playlist = await userModel
      .findOne({ userId })
      .select("likes.playlists")
      .populate("likes.playlists");
    console.log(JSON.stringify(playlist));
    return new Set([]);
  } catch (error) {
    return new Set([]);
  }
};
