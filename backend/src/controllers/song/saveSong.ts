import { saveUserSong } from "../../service/songs/saveUserSong.js";
import { saveSongType } from "../../zodTypes/songType.js";
import { Request, Response } from "express";
import { ISong } from "../../types/songType.js";



export const saveSong = async (req: Request, res: Response) => {
  const { success, data } = saveSongType.safeParse(req.body);
  const userId = req.user.userId;
  if (!success) {
    return res.status(400).json({
      message: "Invalid Input ",
    });

  }

  if (!userId) {
    return res.status(401).json({
      message: "log in to save song",
    });
  }

  try {

    await saveUserSong(userId, data as ISong);
    res.status(200).json({
      message: "song saved"
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Error saving Song"
    })
  }





};
