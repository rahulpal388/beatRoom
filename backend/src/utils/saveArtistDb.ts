import { IArtists } from "../controllers/artist/getTopArtist.js";
import { artistModel } from "../db/schema/artist.js";

export const saveArtistDb = async (artists: IArtists[]) => {
  try {
    const artistsObj = artists.map((artist) => ({
      updateOne: {
        filter: { id: artist.id },
        update: { $setOnInsert: artist },
        upsert: true,
      },
    }));

    await artistModel.bulkWrite(artistsObj);
    return await artistModel.find({
      id: { $in: artists.map((x) => x.id) },
    });
  } catch (error) {
    return null;
  }
};
