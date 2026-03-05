import z from "zod";

export const saveAlbumType = z.object({
  id: z.string(),
  title: z.string(),
  type: z.string(),
  perma_url: z.string(),
  image: z.string(),
  isLiked: z.boolean(),
  subtitle: z.string(),
  list_count: z.string(),
  language: z.string()
});
