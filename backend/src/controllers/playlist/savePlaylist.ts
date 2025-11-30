import { savePlaylistType } from "../../zodTypes/playlist.js";
import { playlistModel } from "../../db/schema/playlist.js";
import { Request, Response } from "express";

export const savePlaylist = async (req: Request, res: Response) => {
  const { success, data } = savePlaylistType.safeParse(req.body);

  if (!success) {
    res.status(400).json({
      message: "Invalid input",
    });

    return;
  }

  try {
    const playlist = await playlistModel.create({
      id: data.id,
      title: data.title,
      subtitle: data.subtitle,
      type: data.type,
      image: data.image,
      perma_url: data.perma_url,
      isLiked: true,
      more_info: {
        song_count: data.more_info.song_count,
      },
    });

    res.status(200).json(playlist);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while saving the playlist",
    });
  }
};
