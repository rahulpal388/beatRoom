import { IArtists } from "../../controllers/artist/getTopArtist";
import { getSongDetails } from "../../utils/getSongDetails";
import axios from "axios";
import { Request, Response } from "express";

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

type ISearchReco = ISearch & {
  artists: {
    data: IArtists[];
  };
};

// get the info about the artist
export const getSearchReco = async (req: Request, res: Response) => {
  const { query } = req.query;

  try {
    const searchResponse = (
      await axios.get(
        `https://www.jiosaavn.com/api.php?__call=autocomplete.get&_format=json&_marker=1&cc=in&includeMetaTags=2&query=${query}`
      )
    ).data as ISearch;

    const token = searchResponse.topquery.data[0].url.split("/").at(-1);

    const songDetail = await getSongDetails(token || "");

    console.log(searchResponse.topquery.data[0].url);
    const artists = !songDetail
      ? []
      : [
          ...new Map(
            songDetail[0].more_info.artistMap.artists.map((artist) => [
              artist.id,
              artist,
            ])
          ).values(),
        ];

    console.log(artists);

    const result: ISearchReco = {
      albums: {
        data: searchResponse.albums.data.map((album) => {
          return {
            id: album.id,
            title: album.title,
            image: album.image,
            music: album.music,
            url: album.url,
            type: album.type,
            description: album.description,
          };
        }),
      },
      songs: {
        data: searchResponse.songs.data.map((song) => {
          return {
            id: song.id,
            title: song.title,
            image: song.image,
            album: song.album,
            url: song.url,
            type: song.type,
            description: song.description,
            more_info: {
              primary_artists: song.more_info.primary_artists,
              language: song.more_info.language,
            },
          };
        }),
      },
      topquery: {
        data: searchResponse.topquery.data.map((song) => {
          return {
            id: song.id,
            title: song.title,
            image: song.image,
            album: song.album,
            url: song.url,
            type: song.type,
            description: song.description,
            more_info: {
              primary_artists: song.more_info.primary_artists,
              language: song.more_info.language,
            },
          };
        }),
      },
      artists: {
        data: artists,
      },
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(null);
  }
};
