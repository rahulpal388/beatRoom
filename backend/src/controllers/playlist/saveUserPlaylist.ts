import { artistModel } from "db/schema/artist.js";
import { saveUserPlaylistType } from "../../zodTypes/playlist.js";
import { Request, Response } from "express";

export const saveUserPlaylist = async (req: Request, res: Response) => {
  // const { success, data } = saveUserPlaylistType.safeParse(req.body);

  // if (!success) {
  //   res.status(400).json({
  //     message: "Invalid Input",
  //   });
  //   return;
  // }

  // try {
  //   const artistsArr = data.songs.flatMap((x) => x.more_info.artistMap.artists);

  //   await artistModel.bulkWrite(
  //     artistsArr.map((artist) => ({
  //       updateOne: {
  //         filter: { id: artist.id },
  //         update: { $setOnInsert: artist },
  //         upsert: true,
  //       },
  //     }))
  //   );

  //   const artistData = await artistModel.find({
  //     id: artistsArr.map((x) => x.id),
  //   });

  //   const songArr = data.songs.map((song) => {
  //     const formatedSong = {
  //       ...song,
  //       more_info: {
  //         ...song.more_info,
  //         artistMap: {
  //           artist: artistData.filter(
  //             (x) => x.id === song.more_info.artistMap.artists
  //           ),
  //         },
  //       },
  //     };
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
  res.status(500).json({
    messsage: "error while saving the user playlist",
  });
};
