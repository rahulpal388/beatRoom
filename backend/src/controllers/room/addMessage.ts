import { apiError } from "@utils/apiError.js";
import { messageModal } from "db/schema/message.js";
import { roomModel } from "db/schema/rooms.js";
import { NextFunction, Request, Response } from "express";
import z from "zod";


export const MessagesType = z.object({
    sender: z.string(),
    roomId: z.string(),
    message: z.string().max(300)
})


export async function addMessage(req: Request, res: Response, next: NextFunction) {

    const { success, data } = MessagesType.safeParse(req.body)
    const user = req.user;
    if (!user) {
        return next(new apiError(400, "Unauthorize", {
            message: "Login first"
        }))
    }
    if (!success) {
        return next(new apiError(401, "Invalid input", {
            message: "Invalid input"
        }))
    }

    try {
        const message = await messageModal.create({
            senderId: user.userId,
            sender: data.sender,
            roomId: data.roomId,
            message: data.message,
            createdAt: Date.now()
        })
        await roomModel.findOneAndUpdate(
            { roomId: data.roomId },
            {
                $addToSet: {
                    message: message._id
                }
            })

        res.status(200).json({
            message: "Successfull"
        })
    } catch (error) {
        next(new apiError(500, "Error inserting chat message", {
            message: "server error"
        }))
    }

}