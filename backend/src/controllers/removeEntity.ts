import { formatValidationError } from "../utils/formatZodValidationError.js";
import { Request, Response } from "express";
import { removeUserAlbum } from "../service/album/removeUserAlbum.js";
import { removeLikedArtist } from "../service/artists/removeLikedArtist.js";
import { removeLikedPlaylist } from "../service/playlist/removeLikedPlaylist.js";
import { removeUserSong } from "../service/songs/removeUserSong.js";
import z from "zod";



export const removeEntity = async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const { success, data, error } = z.object({ id: z.string(), type: z.string() }).safeParse(req.body);
    if (!userId) {
        return res.status(401).json({
            message: "log in to remove song",
        });
    }

    if (!success) {
        return res.status(401).json({
            message: formatValidationError(error)
        })
    }

    try {
        switch (data.type) {
            case "playlist": {
                await removeLikedPlaylist(userId, data.id, data.type);
                break;
            }
            case "userPlaylist": {
                await removeLikedPlaylist(userId, data.id, data.type);
                break;
            }
            case "song": {
                await removeUserSong(userId, data.id)
                break;
            }
            case "album": {
                await removeUserAlbum(userId, data.id);
                break;
            }
            case "artist": {
                await removeLikedArtist(userId, data.id)
                break;
            }
        }
        // remove depending on the id and type
        res.status(200).json({
            messae: "items removed"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Error removing song"
        })

    }

};
