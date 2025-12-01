import z from "zod";

export const saveSongType = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  type: z.string(),
  perma_url: z.string(),
  image: z.string(),
  language: z.string(),
  isLiked: z.boolean(),
  more_info: z.object({
    album_id: z.string(),
    album: z.string(),
    album_url: z.string(),
    duration: z.string(),
    encrypted_media_url: z.string(),
    release_date: z.string(),
    artistMap: z.object({
      artists: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          image: z.string(),
          perma_url: z.string(),
          role: z.string(),
          type: z.string(),
        })
      ),
    }),
  }),
});
