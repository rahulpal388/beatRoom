import { saveLikedArtist } from "../../service/artists/saveLikedArtist.js";
import { saveArtistType } from "../../zodTypes/artistType.js";
import { Request, Response } from "express";

export const saveArtist = async (req: Request, res: Response) => {
  const { success, data } = saveArtistType.safeParse(req.body);
  const userId = req.user.userId;
  console.log(data);
  if (!success) {
    return res.status(400).json({
      message: "Invalid Input",
    });
  }

  if (!userId) {
    return res.status(401).json({
      messsage: "log in to remove artists"
    })
  }
  try {
    await saveLikedArtist(userId, {
      id: data.id,
      name: data.name,
      role: data.role,
      image: data.image,
      type: "artist",
      perma_url: data.perma_url,
      isLiked: true
    })



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
