import { IArtists } from "./artistType";
type ISearchSong = {
  id: string;
  title: string;
  image: string;
  album: string;
  url: string;
  type: string;
  description: string;
  more_info: {
    primary_artists: string;
    language: string;
  };
};
type ISearch = {
  albums: {
    data: {
      id: string;
      title: string;
      image: string;
      music: string;
      url: string;
      type: "album";
      description: string;
    }[];
  };
  songs: {
    data: ISearchSong[];
  };

  topquery: {
    data: ISearchSong[];
  };
};

export type ISearchReco = ISearch & {
  artists: {
    data: IArtists[];
  };
};
