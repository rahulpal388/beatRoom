// import { ISong } from "@/types/songType";
// import React, {
//   createContext,
//   Dispatch,
//   SetStateAction,
//   useContext,
//   useRef,
//   useState,
// } from "react";

// type ICurrentSongContextType = {
//   isPlaying: boolean;
//   setIsPlaying: Dispatch<SetStateAction<boolean>>;
//   progressValue: number;
//   setProgressValue: Dispatch<SetStateAction<number>>;
//   playerRef: React.RefObject<HTMLVideoElement | null>;
// };

// const tempSong: ISong = {
//   id: "63p4Sk9F",
//   title: "Tum Mere Na Huye (From “Thamma”)",
//   subtitle: "Sachin-Jigar, Madhubanti Bagchi, Amitabh Bhattacharya - Thamma",
//   type: "song",
//   perma_url:
//     "https://www.jiosaavn.com/song/tum-mere-na-huye-from-%e2%80%9cthamma%e2%80%9d/RlsbBSdbDnU",
//   image:
//     "https://c.saavncdn.com/383/Thamma-Hindi-2025-20251013145559-500x500.jpg",
//   language: "hindi",
//   isLiked: false,
//   more_info: {
//     album_id: "68823398",
//     album: "Thamma",
//     album_url: "https://www.jiosaavn.com/album/thamma/E4S1tqgSpr4_",
//     duration: "195",
//     encrypted_media_url:
//       "ID2ieOjCrwfgWvL5sXl4B1ImC5QfbsDyAYUOYhE1R9hA+dVUXkQIkqAts6GnRO65SVO50esDHLRbiEmEHOz38xw7tS9a8Gtq",
//     artistMap: {
//       artists: [
//         {
//           id: "461968",
//           name: "Sachin-Jigar",
//           image:
//             "https://c.saavncdn.com/artists/Sachin-Jigar_002_20180507092234_150x150.jpg",
//           perma_url:
//             "https://www.jiosaavn.com/artist/sachin-jigar-songs/JO1Nx088Pfo_",
//           role: "music",
//           type: "artist",
//         },
//         {
//           id: "461968",
//           name: "Sachin-Jigar",
//           image:
//             "https://c.saavncdn.com/artists/Sachin-Jigar_002_20180507092234_150x150.jpg",
//           perma_url:
//             "https://www.jiosaavn.com/artist/sachin-jigar-songs/JO1Nx088Pfo_",
//           role: "singer",
//           type: "artist",
//         },
//         {
//           id: "670466",
//           name: "Madhubanti Bagchi",
//           image:
//             "https://c.saavncdn.com/artists/Madhubanti_Bagchi_003_20250124101814_150x150.jpg",
//           perma_url:
//             "https://www.jiosaavn.com/artist/madhubanti-bagchi-songs/2WGyBWpxfxM_",
//           role: "singer",
//           type: "artist",
//         },
//         {
//           id: "458681",
//           name: "Amitabh Bhattacharya",
//           image:
//             "https://c.saavncdn.com/artists/Amitabh_Bhattacharya_003_20241118063351_150x150.jpg",
//           perma_url:
//             "https://www.jiosaavn.com/artist/amitabh-bhattacharya-songs/hsNRL6ZmJmo_",
//           role: "singer",
//           type: "artist",
//         },
//         {
//           id: "458681",
//           name: "Amitabh Bhattacharya",
//           image:
//             "https://c.saavncdn.com/artists/Amitabh_Bhattacharya_003_20241118063351_150x150.jpg",
//           perma_url:
//             "https://www.jiosaavn.com/artist/amitabh-bhattacharya-songs/hsNRL6ZmJmo_",
//           role: "lyricist",
//           type: "artist",
//         },
//       ],
//     },
//     release_date: "2025-10-13",
//   },
// };

// const currentSongContext = createContext<ICurrentSongContextType | undefined>(
//   undefined
// );

// export const CurrentSongConttextProvider: React.FC<{
//   children: React.ReactNode;
// }> = ({ children }) => {
//   const playerRef = useRef<HTMLVideoElement | null>(null);
//   const [isPlaying, setIsPlaying] = useState<boolean>(false);
//   const [progressValue, setProgressValue] = useState<number>(0);

//   return (
//     <currentSongContext.Provider
//       value={{
//         isPlaying,
//         setIsPlaying,
//         setProgressValue,
//         progressValue,
//         playerRef,
//       }}
//     >
//       {children}
//     </currentSongContext.Provider>
//   );
// };

// export const useCurrentSongDetail = (): ICurrentSongContextType => {
//   const context = useContext(currentSongContext);
//   if (!context) {
//     throw new Error(
//       "useCurrentSongDeatil should be used inside the context provider"
//     );
//   }
//   return context;
// };
