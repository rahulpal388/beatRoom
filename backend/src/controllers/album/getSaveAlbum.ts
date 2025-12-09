import { userModel } from "../../db/schema/user.js";
import { Request, Response } from "express";

export const getSaveAlbum = async (req: Request, res: Response) => {
  const userId = req.user.userId;

  try {
    const album = await userModel.findOne({ userId }).populate({
      path: "likes.albums",
      model: "Albums",
      select: "-_id -__v",
    });
    console.log(JSON.stringify(album?.likes?.albums));
    res.status(200).json(album?.likes?.albums);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error while getting the album ",
    });
  }
};
