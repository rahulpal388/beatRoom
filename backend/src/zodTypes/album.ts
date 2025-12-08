import z from "zod";

export const saveAlbumType = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  type: z.string(),
  perma_url: z.string(),
  image: z.string(),
  language: z.string(),
  list_count: z.string().optional(),
  isLiked: z.boolean(),
  more_info: z.object({
    album: z.string().optional(),
    album_id: z.string().optional(),
    album_url: z.string().optional(),
    duration: z.string().optional(),
    encrypted_media_url: z.string().optional(),
    release_date: z.string().optional(),
    artistMap: z.object({
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
    }),
  }),
});
