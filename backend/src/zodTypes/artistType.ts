import z from "zod";

export const saveArtistType = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  perma_url: z.string(),
  isLiked: z.boolean(),
  role: z.string(),
  type: z.string(),
});
