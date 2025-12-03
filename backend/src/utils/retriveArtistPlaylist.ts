import { IPlaylistResponse } from "@controllers/playlist/getTrendingPlaylist.js";

export const retriveArtistPlaylist = (
  playlists: IPlaylistResponse[],
  isLiked: boolean
): IPlaylistResponse[] => {
  console.log(playlists);
  return playlists.map((playlist) => {
    return {
      id: playlist.id,
      title: playlist.title,
      subtitle: playlist.subtitle,
      type: playlist.type,
      image: playlist.image.replace("150x150", "500x500"),
      perma_url: playlist.perma_url,
      isLiked: isLiked,
      more_info: {
        entity_type: playlist.more_info.entity_type,
        song_count: playlist.more_info.song_count,
        language: playlist.more_info.language,
      },
    };
  });
};
