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
    const idArr = playlist
      ? playlist.likes?.playlists.map((x) => String(x.id))
      : [];
    console.log(JSON.stringify(idArr));
    return new Set(idArr);
  } catch (error) {
    return new Set([]);
  }
};
