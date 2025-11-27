import z from "zod"



export const CreateRoomType = z.object({
    username: z.string(),
    roomname: z.string()
})
