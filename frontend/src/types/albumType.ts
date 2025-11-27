// export type IAlbumSongs = {
//     id: string,
//     name: string,
//     type: string,
//     language: string,
//     artists: {
//         primary: {
//             id: string,
//             name: string,
//             role: string,
//             image: {
//                 quality: string,
//                 url: string
//             }[]
//             ,
//             type: string,
//             url: string
//         }[]
//     },
//     image: {
//         quality: string,
//         url: string
//     }[],
//     songs: {
//         id: string,
//         name: string,
//         type: string,
//         duration: number,
//         language: string,
//         album: {
//             id: string,
//             name: string,
//         },
//         artists: {
//             primary: {
//                 id: string,
//                 name: string,
//                 role: string,
//                 image: {
//                     quality: string,
//                     url: string
//                 }[]
//                 ,
//                 type: string,
//                 url: string
//             }[]
//         },
//         image: {
//             quality: string,
//             url: string
//         }[]
//     }[]
// }

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
  type: string;
  perma_url: string;
  image: string;
};
