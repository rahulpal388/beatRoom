import { apiError } from "@utils/apiError.js";
import { userModel } from "db/schema/user.js";
import { NextFunction, Request, Response } from "express";

type ReturnRoomType = {
    roomId: string;
    roomName: string;
}


export async function getRooms(req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    if (!user) {
        return next(new apiError(401, "Unauthorize", {
            message: "login to get room info"
        }))
    }

    try {
        const findUser = await userModel.findOne({ _id: user._id }).populate<{ rooms: ReturnRoomType[] }>({
            path: "rooms",
            select: "-_id -__v "
        })

        if (!findUser) {
            return next(new apiError(401, "Unauthorize", {
                message: "login to get room info"
            }))
        }
        const rooms: ReturnRoomType[] = findUser.rooms.map((room) => ({
            roomId: room.roomId,
            roomName: room.roomName
        }))
        res.status(200).json(rooms)
    } catch (error) {
        next(new apiError(500, "Error getting rooms", {
            message: "Error getting rooms"
        }))
    }

}