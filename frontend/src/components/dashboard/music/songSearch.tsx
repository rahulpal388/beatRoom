// import { MoveLeft } from "lucide-react";
// import { Dispatch, SetStateAction } from "react";
// import { ISong } from "@/types/searchedSongType";
// import { useCurrentSongDetail } from "@/context/currentSong";
// import { useQueue } from "@/context/queueContext";
// import { IShowSongDetails, ShowSongDetails } from "@/ui/showSongDetails";
// import { ISongAlbum } from "@/types/albumType";

// const exampelShowDetails: IShowSongDetails = {
//   title: "Tum Hi Ho",
//   album: "Aashiqui 2",
//   artists: "Mithoon, Arijit Singh",
//   language: "hindi",
//   type: "song",
//   durations: "262",
//   image: "https://c.saavncdn.com/430/Aashiqui-2-Hindi-2013-500x500.jpg",
//   url: "https://www.jiosaavn.com/song/tum-hi-ho/EToxUyFpcwQ",
//   released_date: "2013-04-04",
// };

// export function SearchedMusic({
//   setSongSuggestion,
//   song,
//   album,
// }: {
//   setSongSuggestion: Dispatch<SetStateAction<boolean>>;
//   song: ISong | undefined;
//   album: ISongAlbum | undefined;
// }) {
//   const { setIsPlaying, setCurrentSong } = useCurrentSongDetail();
//   return (
//     <div>
//       <div className="  ">
//         <MoveLeft
//           className="size-8 cursor-pointer "
//           onClick={() => setSongSuggestion(false)}
//         />
//       </div>
//       <ShowSongDetails songDetails={exampelShowDetails} />
//     </div>
//   );
// }
