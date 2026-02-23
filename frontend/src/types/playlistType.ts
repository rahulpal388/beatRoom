import { IArtists } from "./artistType";
import { ISong } from "./songType";



export type IPlaylist = {
  id: string;
  title: string;
  subtitle: string;
  type: "playlist";
  image: string;
  perma_url: string;
  isLiked: boolean;
};

export type IPlaylistSong = {
  id: string;
  title: string;
  subtitle: string;
  type: "playlist";
  perma_url: string;
  image: string;
  list_count: string;
  isLiked: boolean;
  language: string;
  list: ISong[];
  more_info: {
    artists: IArtists[];
  };
};
