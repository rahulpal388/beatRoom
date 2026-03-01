import { apiError } from "../../utils/apiError.js";
import { userModel } from "../../db/schema/user.js";
import { NextFunction, Request, Response } from "express";


export async function getSaveArtist(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.user

    if (!userId) {
        return next(new apiError(401, "Unauthorize login to get the save artist", {
            message: "Login to get the save artits"
        }))
    }

    try {
        const user = await userModel.findOne({ userId }).populate({
            path: "artists",
            select: "-_id -__v"
        })

        if (!user) {
            throw new Error("Error while getting the saved artits")

        }
        res.status(200).json(user.artists)

    } catch {
        return next(new apiError(500, "Error while getting save artist", {
            message: "Server Error"
        }))
    }

}