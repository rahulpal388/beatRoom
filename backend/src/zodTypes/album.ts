import z from "zod";

export const saveAlbumType = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  type: z.string(),
  perma_url: z.string(),
  image: z.string(),
  language: z.string(),
  list_count: z.string(),
  isLiked: z.string(),
  more_info: {
    artistMap: {
      artists: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          role: z.string(),
          image: z.string(),
          type: z.string(),
          perma_url: z.string(),
        })
      ),
    },
  },
});
