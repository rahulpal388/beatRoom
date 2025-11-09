import z from "zod";


export const paginationType = z.object({
    limit: z.string(),
    page: z.string()
})