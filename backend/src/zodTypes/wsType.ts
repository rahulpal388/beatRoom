import z, { xid } from "zod";



// type action = "join" | "leave" | "stream"



// type IJoinRoom = {
//     action: action,
//     roomId: string,
//     roomName: string

// }

export const joinRoomType = z.object({
    type: z.enum(["join"]),
    roomId: z.string()
})





export const stream = z.discriminatedUnion("type", [
    z.object({
        type: z.literal("chat"),
        roomId: z.string(),
        username: z.string(),
        message: z.string()
    }),
    z.object({
        type: z.literal("youtube"),
        roomId: z.string(),
        action: z.enum(["play", "pause"])
    })
])

