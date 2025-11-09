import z from "zod";



export const TrendingType = z.object({
    type: z.enum(["song", "album", "playlist"]),
    language: z.string(),
    page: z.string(),
    limit: z.string()
})