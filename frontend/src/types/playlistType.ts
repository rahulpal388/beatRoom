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
  more_info: {
    entity_type: string;
    song_count: string;
    language: string;
  };
};

export type ISongsPlaylist = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  perma_url: string;
  image: string;
  language: string;
  list_count: string;
  list: ISong[];
  more_info: {
    artists: IArtists[];
  };
};
