import { apiError } from "@utils/apiError.js";
import { generateUniqueRoomId } from "@utils/generateUniqueId.js";
import { roomModel } from "db/schema/rooms.js";
import { userModel } from "db/schema/user.js";
import { NextFunction, Request, Response } from "express";
import z from "zod";
import { _discriminatedUnion } from "zod/v4/core";


export const CreateRoomType = z.object({
    roomName: z.string().min(1).max(10),
    userId: z.string().max(8),
})


export async function createRoom(req: Request, res: Response, next: NextFunction) {

    const { success, data } = CreateRoomType.safeParse(req.body);
    const user = req.user;
    if (!user) {
        return next(new apiError(400, "Unauthorize Request", {
            message: "Login to create a room"
        }))

    }

    if (!success) {
        return next(new apiError(401, "Inalid input", {
            message: "Invalid Input"
        }))
    }

    try {
        const roomId = generateUniqueRoomId(data.roomName);
        const room = await roomModel.create({
            roomName: data.roomName,
            roomId,
            admin: user._id,
            members: [user._id],
            queueSongs: [],
            message: []
        })

        await userModel.findOneAndUpdate({ _id: user._id }, {
            $addToSet: {
                "rooms": room._id
            }
        })

        res.status(200).json({
            message: "Room created successfully"
        })
    } catch (error) {
        next(new apiError(500, "Error create new room", {
            message: "Error create new room"
        }))
    }

}