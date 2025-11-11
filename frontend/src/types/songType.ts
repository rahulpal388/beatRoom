export type ISong = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  perm_url: string;
  image: string;
  language: string;
  more_info: {
    album_id: string;
    album: string;
    album_url: string;
    duration: string;
    artistMap: {
      artists: {
        id: string;
        name: string;
        image: string;
        perm_url: string;
        role: string;
        type: string;
      }[];
    };
    released_date: string;
  };
};

type IMoreInfo = Omit<ISong["more_info"], "album_id" | "album" | "album_url"> &
  Partial<Pick<ISong["more_info"], "album_id" | "album" | "album_url">>;

export type INewRelease = Omit<ISong, "more_info"> & { more_info: IMoreInfo };
