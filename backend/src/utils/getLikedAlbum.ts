import { userModel } from "../db/schema/user.js";

export const getLikedAlbum = async (userId: string): Promise<Set<string>> => {
  if (userId.length === 0) {
    return new Set([]);
  }

  try {
    const album = await userModel
      .findOne({ userId })
      .select("likes.albums")
      .populate("likes.albums");
    console.log(album);
    const idArr = album ? album.likes?.albums.map((x) => String(x.id)) : [];
    console.log(JSON.stringify(idArr));
    return new Set(idArr);
  } catch (error) {
    return new Set([]);
  }
};
