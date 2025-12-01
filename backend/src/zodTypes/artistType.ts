import z from "zod";

export const saveArtistType = z.object({
  artistid: z.string(),
  name: z.string(),
  image: z.string(),
  perma_url: z.string(),
  isLiked: z.boolean(),
});
