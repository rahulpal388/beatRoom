import { IArtists } from "./artistType";
import { ISong } from "./songType";



export type IPlaylist = {
  id: string;
  title: string;
  subtitle: string;
  type: "playlist" | "userPlaylist";
  perma_url: string;
  image: string;
  isLiked: boolean;
  list_count: string;
  language: string;
};

export type IPlaylistSong = {
  id: string;
  title: string;
  subtitle: string;
  type: "playlist" | "userPlaylist";
  perma_url: string;
  image: string;
  isLiked: boolean;
  list_count: string;
  language: string;
  list: ISong[];
  more_info: {
    artists: IArtists[];
  };
};
