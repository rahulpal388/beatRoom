import z from "zod";




export const playlistType = z.object({
    page: z.number(),
    limit: z.number(),
    id: z.string()
})