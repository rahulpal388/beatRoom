import { apiError } from "@utils/apiError.js";
import { MessageSchemaType } from "db/schema/message.js";
import { RoomSchemaType } from "db/schema/rooms.js";
import { userModel } from "db/schema/user.js";
import { NextFunction, Request, Response } from "express";
import z from "zod";

export const GetMessageType = z.object({
    roomId: z.string()
})

type RoomMessages = Omit<RoomSchemaType, "message"> & {
    message: MessageSchemaType[]
}

export async function getMessages(req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    const { success, data } = GetMessageType.safeParse(req.query);

    if (!user) {
        return next(new apiError(404, "Unauthorize", {
            message: "Login to get all the messages"
        }))
    }

    if (!success) {
        return next(new apiError(401, "Invalid input", {
            message: "Invlid input"
        }))
    }

    const findUser = await userModel.findOne({ _id: user._id }).populate<{ rooms: RoomMessages[] }>({
        path: "rooms",
        match: { roomId: data.roomId },
        populate: {
            path: "message"
        }
    })

    if (!findUser) {
        return next(new apiError(404, "Error finding user message", {
            message: "Error"
        }))
    }


    const messages: MessageSchemaType[] = findUser.rooms[0].message.map(msg => ({
        sender: msg.sender,
        roomId: msg.roomId,
        message: msg.message,
        createdAt: msg.createdAt
    }))
    res.status(200).json(messages)

}