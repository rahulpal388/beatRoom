import { IArtists } from "./artistType";

export type ISong = {
  id: string;
  title: string;
  subtitle: string;
  type: "song" | "album";
  perma_url: string;
  image: string;
  language: string;
  isLiked: boolean;
  more_info: {
    album_id: string;
    album: string;
    album_url: string;
    duration: string;
    encrypted_media_url: string;
    artistMap: {
      artists: IArtists[];
    };
    release_date: string;
  };
};
