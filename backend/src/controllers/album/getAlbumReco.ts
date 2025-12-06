import axios from "axios";
import { Request, Response } from "express";

export type IAlbums = {
  id: string;
  title: string;
  type: string;
  perma_url: string;
  image: string;
};

export const getAlbumReco = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const response = await axios.get(
      `https://www.jiosaavn.com/api.php?__call=reco.getAlbumReco&api_version=4&_format=json&_marker=0&ctx=web6dot0&albumid=${id}`
    );
    const album = response.data as IAlbums[];

    const result = album.map((x) => {
      return {
        id: x.id,
        title: x.title,
        subtitle: "",
        type: x.type,
        perma_url: x.perma_url,
        image: x.image.replace("150x150", "500x500"),
        language: "",
        isLiked: false,
        more_info: {
          artistMap: {
            artists: [
              {
                id: "",
                name: "",
                role: "",
                image: "",
                type: "",
                perma_url: "",
              },
            ],
          },
        },
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(200).json([]);
  }
};
