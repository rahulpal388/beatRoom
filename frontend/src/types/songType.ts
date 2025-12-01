export type ISong = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
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
      artists: {
        id: string;
        name: string;
        image: string;
        perma_url: string;
        role: string;
        type: string;
      }[];
    };
    release_date: string;
  };
};

type IMoreInfo = Omit<ISong["more_info"], "album_id" | "album" | "album_url"> &
  Partial<Pick<ISong["more_info"], "album_id" | "album" | "album_url">>;

export type INewRelease = Omit<ISong, "more_info"> & { more_info: IMoreInfo };
