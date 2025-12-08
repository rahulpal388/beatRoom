import { artistModel } from "../../db/schema/artist.js";
import { saveSongType } from "../../zodTypes/songType.js";
import { Request, Response } from "express";
import { songModel } from "../../db/schema/song.js";
import { userModel } from "../../db/schema/user.js";
import { saveArtistDb } from "../../utils/saveArtistDb.js";

export const saveSong = async (req: Request, res: Response) => {
  const { success, data } = saveSongType.safeParse(req.body);
  const userId = req.user.userId;
  if (!success) {
    res.status(400).json({
      message: "Invalid Input ",
    });

    return;
  }

  if (userId.length === 0) {
    return res.status(401).json({
      message: "log in to save song",
    });
  }

  try {
    const artistData = await saveArtistDb(data.more_info.artistMap.artists);
    const artistObjectId = artistData ? artistData.map((x) => x._id) : [];
    const song = await songModel.findOneAndUpdate(
      { id: data.id },
      {
        id: data.id,
        title: data.title,
        subtitle: data.subtitle,
        type: data.type,
        image: data.image,
        perma_url: data.perma_url,
        language: data.language,
        isLiked: data.isLiked,
        "more_info.album_id": data.more_info.album_id,
        "more_info.album": data.more_info.album,
        "more_info.album_url": data.more_info.album_url,
        "more_info.duration": data.more_info.duration,
        "more_info.encrypted_media_url": data.more_info.encrypted_media_url,
        "more_info.artistMap.artists": artistObjectId,
        "more_info.release_date": data.more_info.release_date,
      },
      { new: true, upsert: true }
    );

    await userModel.findOneAndUpdate(
      { userId: req.user.userId },
      { $addToSet: { "likes.songs": song._id } },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "song is saved",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error while saving the song",
    });
  }
};
