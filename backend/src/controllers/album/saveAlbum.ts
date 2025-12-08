import { albumModel } from "../../db/schema/album.js";
import { saveAlbumType } from "../../zodTypes/album.js";
import { Request, Response } from "express";
import { userModel } from "../../db/schema/user.js";
import { saveArtistDb } from "../../utils/saveArtistDb.js";

export const saveAlbum = async (req: Request, res: Response) => {
  console.log("saving album");

  const { success, data } = saveAlbumType.safeParse(req.body);
  const userId = req.user.userId;

  if (!success) {
    return res.status(401).json({
      message: "invalid input",
    });
  }

  if (userId.length === 0) {
    return res.status(401).json({
      message: "log in to save album",
    });
  }

  try {
    const artistObj =
      data.more_info.artistMap.artists[0].id.length === 0
        ? []
        : await saveArtistDb(data.more_info.artistMap.artists);
    const album = await albumModel.findOneAndUpdate(
      { id: data.id },
      {
        $set: {
          id: data.id,
          type: data.type,
          title: data.title,
          perma_url: data.perma_url,
          image: data.image,
          list_count: data.list_count || "",
          isLiked: data.isLiked,
          more_info: {
            artistMap: {
              artists: artistObj?.map((x) => x._id) || [],
            },
          },
        },
      },
      { new: true, upsert: true }
    );
    console.log(album);
    await userModel.findOneAndUpdate(
      { userId },
      { $addToSet: { "likes.albums": album._id } }
    );
    res.status(200).json({
      message: "album saved",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error while saving the album",
    });
  }
};
