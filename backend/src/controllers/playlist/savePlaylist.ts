import { savePlaylistType } from "../../zodTypes/playlist.js";
import { playlistModel } from "../../db/schema/playlist.js";
import { Request, Response } from "express";
import { userModel } from "../../db/schema/user.js";

export const savePlaylist = async (req: Request, res: Response) => {
  const { success, data } = savePlaylistType.safeParse(req.body);

  if (!success) {
    res.status(400).json({
      message: "Invalid input",
    });

    return;
  }

  try {
    const playlist = await playlistModel.findOneAndUpdate(
      { id: data.id },
      {
        id: data.id,
        title: data.title,
        subtitle: data.subtitle,
        type: data.type,
        image: data.image,
        perma_url: data.perma_url,
        isLiked: data.isLiked,
      },
      { new: true, upsert: true }
    );

    await userModel.findOneAndUpdate(
      { userId: req.params.userId },
      { "likes.playlists": playlist._id }
    );

    res.status(200).json({
      message: "playlist saved",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while saving the playlist",
    });
  }
};
