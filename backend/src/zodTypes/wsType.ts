import z from "zod";



// type action = "join" | "leave" | "stream"



// type IJoinRoom = {
//     action: action,
//     roomId: string,
//     roomName: string

// }

export const joinRoomType = z.object({
    action: z.enum(["join"]),
    roomId: z.string(),
    roomName: z.string()
})



export const streamRoomType = z.object({
    action: z.enum(["stream"]),
    roomId: z.string(),
    message: z.string()
})


