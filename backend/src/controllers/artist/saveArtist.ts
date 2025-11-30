import { userModel } from "../../db/schema/user.js";
import { artistModel } from "../../db/schema/artist.js";
import { saveArtistType } from "../../zodTypes/artistType.js";
import { Request, Response } from "express";

export const saveArtist = async (req: Request, res: Response) => {
  const { success, data } = saveArtistType.safeParse(req.body);

  if (!success) {
    res.status(400).json({
      message: "Invalid Input",
    });
    return;
  }

  try {
    console.log(data.userId);
    const artist = await artistModel.findOneAndUpdate(
      { id: data.id },
      { ...data, isLiked: true }
    );

    const user = await userModel.findOneAndUpdate(
      { _id: data.userId },
      { $addToSet: { "likes.songs": artist?._id } }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error while saving the artist",
    });
  }
};
