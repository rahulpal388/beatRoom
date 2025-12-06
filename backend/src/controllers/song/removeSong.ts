import mongoose from "mongoose";
import { songModel } from "../../db/schema/song.js";
import { userModel } from "../../db/schema/user.js";
import { Request, Response } from "express";

export const removeSong = async (req: Request, res: Response) => {
  const userId = req.user.userId;

  if (userId.length === 0) {
    return res.status(401).json({
      message: "log in to remove song",
    });
  }

  try {
    const song = await songModel.findOne({ id: req.body.id });

    await userModel.updateOne(
      { userId },
      { $pull: { "likes.songs": new mongoose.Types.ObjectId(song?._id) } }
    );

    if (!song?.isPlaylist) {
      await songModel.deleteOne({ _id: song?._id });
    } else {
      await songModel.findOneAndUpdate(
        { _id: song._id },
        { $set: { isLiked: !song.isLiked } }
      );
    }

    res.status(200).json({
      message: "song removed",
    });
  } catch (error) {
    res.status(500).json({
      message: "error while removing the song",
    });
  }
};
