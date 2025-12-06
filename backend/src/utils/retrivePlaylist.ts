import {
  IPlaylist,
  IPlaylistResponse,
} from "../controllers/playlist/getTrendingPlaylist.js";

export const retrivePlaylist = (
  playlist: IPlaylist[],
  likedPlaylist: Set<String>
): IPlaylistResponse[] => {
  return playlist.map((x) => {
    return {
      id: x.id,
      title: x.title,
      subtitle: x.subtitle,
      perma_url: x.perma_url,
      image: x.image,
      type: x.type,
      isLiked: likedPlaylist.has(x.id),
      more_info: {
        song_count: "",
        entity_type: "",
        language: "",
      },
    };
  });
};
