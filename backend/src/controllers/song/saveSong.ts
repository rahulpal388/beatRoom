import { artistModel } from "../../db/schema/artist.js";
import { saveSongType } from "../../zodTypes/songType.js";
import { Request, Response } from "express";
import { songModel } from "../../db/schema/song.js";
import { userModel } from "../../db/schema/user.js";

export const saveSong = async (req: Request, res: Response) => {
  const { success, data } = saveSongType.safeParse(req.body);
  console.log(req.body);

  if (!success) {
    res.status(400).json({
      message: "Invalid Input ",
    });

    return;
  }

  try {
    const artists = data.more_info.artistMap.artists.map((artist) => ({
      updateOne: {
        filter: { id: artist.id },
        update: { $setOnInsert: artist },
        upsert: true,
      },
    }));

    await artistModel.bulkWrite(artists);
    const artistData = await artistModel.find({
      id: { $in: data.more_info.artistMap.artists.map((x) => x.id) },
    });

    console.log(data.isLiked);

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
        "more_info.artistMap.artists": artistData.map((x) => x._id),
        "more_info.release_date": data.more_info.release_date,
      },
      { new: true, upsert: true }
    );

    const user = await userModel.findOneAndUpdate(
      { userId: req.params.userId },
      { "likes.songs": song._id }
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
