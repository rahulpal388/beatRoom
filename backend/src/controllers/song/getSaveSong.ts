import { userModel } from "../../db/schema/user.js";
import { Request, Response } from "express";

export const getSaveSong = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  console.log(userId);
  try {
    const user = await userModel.findOne({ userId }).populate({
      path: "likes.songs",
      model: "Songs",
      select: "-_id -__v",
      populate: {
        path: "more_info.artistMap.artists",
        model: "Artists",
        select: "-_id -__v",
      },
    });

    console.log(user?.likes?.songs);
    res.status(200).json(user?.likes?.songs);
  } catch (error) {
    console.log(error);
    res.status(500).json("error while finding the save song");
  }
};
