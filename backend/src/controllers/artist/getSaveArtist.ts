import { userModel } from "../../db/schema/user.js";
import { Request, Response } from "express";


export async function getSaveArtist(req: Request, res: Response) {
    const { userId } = req.user

    if (!userId) {
        return res.status(401).json({
            message: "Log in to get the save artist"
        })
    }

    try {
        const user = await userModel.findOne({ userId }).populate({
            path: "artists",
            select: "-_id -__v"
        })

        if (!user) {
            throw new Error("Error while getting the saved artits")

        }
        console.log(user.artists);
        res.status(200).json(user.artists)

    } catch {
        res.status(500).json({
            message: "Error finding the saved artists"
        })
    }

}