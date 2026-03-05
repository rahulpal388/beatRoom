import { ISong } from "./songType";


export type IAlbum = {
  id: string;
  title: string;
  subtitle: string;
  language: string;
  list_count: string;
  type: "album";
  perma_url: string;
  image: string;
  isLiked: boolean;
};


export type IAlbumSong = {
  id: string;
  title: string;
  subtitle: string;
  type: "album";
  perma_url: string;
  image: string;
  isLiked: boolean;
  language: string;
  list_count: string;
  list: ISong[];
  more_info: {
    artistMap: {
      primary_artists: {
        id: string;
        name: string;
        image: string;
        type: string;
        perma_url: string;
      }[];
    };
  };
};



