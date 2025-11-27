import { retriveSong } from "../../utils/retriveSong";
import axios from "axios";
import { Request, Response } from "express";
import { ISong } from "./getTendingSong";

export const getSong = async (req: Request, res: Response) => {
  const token = req.params.token;
  try {
    const response = (
      await axios.get(
        `https://www.jiosaavn.com/api.php?__call=webapi.get&api_version=4&_format=json&_marker=0&token=${token}&type=song`
      )
    ).data;
    const song = response[Object.keys(response)[0]] as ISong;
    const result = retriveSong([song]);
    res.status(200).json(...result);
  } catch (error) {
    console.log(error);
    res.status(200).json([]);
  }
};
