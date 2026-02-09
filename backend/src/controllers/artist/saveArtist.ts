import { artistModel } from "../../db/schema/artist.js";
import { userModel } from "../../db/schema/user.js";
import { saveArtistType } from "../../zodTypes/artistType.js";
import { Request, Response } from "express";

export const saveArtist = async (req: Request, res: Response) => {
  const { success, data } = saveArtistType.safeParse(req.body);

  console.log(data);
  if (!success) {
    res.status(400).json({
      message: "Invalid Input",
    });
    return;
  }

  try {
    const artist = await artistModel.findOneAndUpdate(
      { id: data.artistid },
      {
        id: data.artistid,
        name: data.name,
        image: data.image,
        perma_url: data.perma_url,
        isLiked: data.isLiked,
      },
      { new: true, upsert: true }
    );
    console.log(req.params.userId);
    await userModel.findOneAndUpdate(
      { userId: req.params.userId },
      { "artists": artist._id }
    );

    res.status(200).json({
      message: "artist save",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error while saving the artist",
    });
  }
};
