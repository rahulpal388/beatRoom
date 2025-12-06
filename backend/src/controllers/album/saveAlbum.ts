import { albumModel } from "../../db/schema/album.js";
import { saveAlbumType } from "../../zodTypes/album.js";
import { Request, Response } from "express";
import { userModel } from "../../db/schema/user.js";

export const saveAlbum = async (req: Request, res: Response) => {
  const { success, data } = saveAlbumType.safeParse(req.body);
  const userId = req.params.userId;

  if (!success) {
    return res.status(401).json({
      message: "invalid input",
    });
  }

  if (userId.length === 0) {
    return res.status(401).json({
      message: "log in to save album",
    });
  }

  try {
    const album = await albumModel.findOneAndUpdate(
      { id: data.id },
      { $set: data },
      { new: true, upsert: true }
    );

    await userModel.findOneAndUpdate(
      { userId },
      { $addToSet: { "likes.albums": album._id } }
    );
  } catch (error) {
    res.status(500).json({
      message: "error while saving the album",
    });
  }
};
