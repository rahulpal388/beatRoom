import { decryptUrl } from "../../utils/decryptUrl";
import { Request, Response } from "express";

export const getSongUrl = async (req: Request, res: Response) => {
  console.log(req.body);
  const { id } = req.body;
  console.log(id);
  try {
    const url = decryptUrl(id);
    console.log(url);
    res.status(200).json({ song_url: url });
  } catch (error) {
    res.status(200).json({ song_url: "" });
  }
};
