import { albumModel } from "../../db/schema/album.js";
import { userModel } from "../../db/schema/user.js";
import { Request, Response } from "express";

export const removeAlbum = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  if (userId.length === 0) {
    return res.status(401).json({
      message: "log in to remove the album",
    });
  }

  try {
    const album = await albumModel.findOne({ id: req.body.id });
    await Promise.all([
      userModel.findOneAndUpdate(
        { userId },
        { $pull: { "likes.albums": album?._id } }
      ),
      albumModel.deleteOne({ _id: album?._id }),
    ]);
    res.status(200).json({
      message: "remove album",
    });
  } catch (error) {
    res.status(500).json({
      message: "error while removing the album",
    });
  }
};
