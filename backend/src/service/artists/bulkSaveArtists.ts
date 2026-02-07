import { Types } from "mongoose";
import { artistModel } from "../../db/schema/artist.js";
import { IArtists } from "../../types/artistType.js";



export async function bulkSaveArtists(artists: IArtists[]): Promise<Types.ObjectId[] | null> {

    try {
        const artistsObj = artists.map((artist) => ({
            updateOne: {
                filter: { id: artist.id },
                update: { $setOnInsert: artist },
                upsert: true,
            },
        }));

        await artistModel.bulkWrite(artistsObj);
        const artistsIds = await artistModel.find({
            id: { $in: artists.map((x) => x.id) },
        });
        return artistsIds.map(x => x._id);
    } catch (error) {
        return null;
    }
}