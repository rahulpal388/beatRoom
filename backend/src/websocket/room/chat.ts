import { broadcast } from "../broadCast.js";
import z from "zod";


export const ChatType = z.object({
    type: z.literal("SEND_MESSAGE"),
    payload: z.object({
        roomId: z.string(),
        userId: z.string(),
        message: z.string()
    })
})

export type IChat = z.infer<typeof ChatType>;


export function chatFn(data: IChat) {
    broadcast(data.payload.roomId, data.payload.userId, data.payload.message);
}