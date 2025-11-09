import { MoveLeft } from "lucide-react";
import { Music, TSong } from "./MusicPages/music";
import { Dispatch, SetStateAction } from "react";
import { ISong } from "@/types/searchedSongType";
import { IAlbumSongs } from "@/types/albumType";
import { ITrendingSong } from "@/types/trendingSongType";
import Image from "next/image";
import { SongsSection } from "./songCard";
import { decodeHTML } from "@/lib/decodeHtml";
import { useCurrentSongDetail } from "@/context/currentSong";
import { useQueue } from "@/context/queueContext";
import { IShowSongDetails, ShowSongDetails } from "@/ui/showSongDetails";

const exampelShowDetails: IShowSongDetails = {
  title: "Tum Hi Ho",
  album: "Aashiqui 2",
  artists: "Mithoon, Arijit Singh",
  language: "hindi",
  type: "song",
  durations: "262",
  image: "https://c.saavncdn.com/430/Aashiqui-2-Hindi-2013-500x500.jpg",
  url: "https://www.jiosaavn.com/song/tum-hi-ho/EToxUyFpcwQ",
  released_date: "2013-04-04",
};

export function SearchedMusic({
  setSongSuggestion,
  song,
  album,
  trending,
}: {
  setSongSuggestion: Dispatch<SetStateAction<boolean>>;
  song: ISong | undefined;
  album: IAlbumSongs | undefined;
  trending: ITrendingSong[] | undefined;
}) {
  const { setIsPlaying, setCurrentSong } = useCurrentSongDetail();
  const { setQueueSongs } = useQueue();
  return (
    <div>
      <div className="  ">
        <MoveLeft
          className="size-8 cursor-pointer "
          onClick={() => setSongSuggestion(false)}
        />
      </div>
      <ShowSongDetails songDetails={exampelShowDetails} />

    </div>
  );
}
