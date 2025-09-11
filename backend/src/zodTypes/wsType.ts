import z from "zod";



// type action = "join" | "leave" | "stream"



// type IJoinRoom = {
//     action: action,
//     roomId: string,
//     roomName: string

// }

export const joinRoomType = z.object({
    action: z.enum(["join"]),
    roomId: z.string()
})



export const chatRoomType = z.object({
    action: z.enum(["chat"]),
    roomId: z.string(),
    username: z.string(),
    message: z.string()
})


