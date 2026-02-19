import { ApiPlaylist, IPlaylist } from "../types/playlistType.js";

export const retrivePlaylist = (
  playlist: ApiPlaylist[],
  likedPlaylist: Set<string>
): IPlaylist[] => {
  return playlist.map((x) => (
    {
      id: x.id,
      title: x.title,
      subtitle: x.subtitle,
      perma_url: x.perma_url,
      image: x.image,
      type: x.type,
      isLiked: likedPlaylist.has(x.id),
    }
  ));
};
