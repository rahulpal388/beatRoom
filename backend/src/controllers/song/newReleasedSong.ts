import { Request, Response } from "express";
import { paginationType } from "../../zodTypes/paginatipType.js";
import { newReleasedSong } from "service/songs/newReleasedSong.js";



const getNewReleasedSong = async (req: Request, res: Response) => {
  const { success, data } = paginationType.safeParse(req.query);
  const userId = req.user.userId;
  if (!success) {
    res.status(401).json({
      message: "Invalid input"
    });
    return;
  }

  const newSong = await newReleasedSong(userId, data.limit, data.page);

  res.status(200).json(newSong);

};

export default getNewReleasedSong;
