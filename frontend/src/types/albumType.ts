import { ISong } from "./songType";

export type ISongAlbum = {
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

export type IAlbums = {
  id: string;
  title: string;
  type: "album";
  perma_url: string;
  image: string;
  isLiked: boolean;
};
