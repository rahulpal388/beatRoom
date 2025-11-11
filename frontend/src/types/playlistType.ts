export interface IPlaylist {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  image: string;
  perma_url: string;
  more_info: {
    song_count: string;
  };
}
