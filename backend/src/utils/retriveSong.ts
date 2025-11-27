import { ISong } from "../controllers/song/getTendingSong";

export const retriveSong = (songs: ISong[]): ISong[] => {
  return songs.map((item) => {
    return {
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      type: item.type,
      perma_url: item.perma_url,
      image: item.image,
      language: item.language,
      more_info: {
        album_id: item.more_info.album_id,
        album: item.more_info.album,
        album_url: item.more_info.album_url,
        duration: item.more_info.duration,
        encrypted_media_url: item.more_info.encrypted_media_url,
        artistMap: {
          artists: item.more_info.artistMap.artists.map((x) => {
            return {
              id: x.id,
              name: x.name,
              image: x.image,
              perma_url: x.perma_url,
              role: x.role,
              type: x.type,
            };
          }),
        },
        release_date: item.more_info.release_date,
      },
    };
  });
};
