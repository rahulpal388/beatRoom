import { IPlaylist } from "@/types/playlistType";
import { useEffect, useState } from "react";
import { SongCardContaier } from "./songCardContainer";
import { SongCards } from "./songCard";
import { getSavePlaylist } from "@/api/playlist/getSavePlaylist";

export function LikedPlaylist() {
  const [playlist, setPlaylist] = useState<IPlaylist[]>([]);


  useEffect(() => {
    const fetchPlaylist = async () => {
      const response = await getSavePlaylist();
      setPlaylist(response);
    };
    fetchPlaylist();
  }, []);

  return (
    <>
      {playlist.length == 0 ? (
        <div className=" py-[4rem] flex items-center justify-center  ">
          <h1 className=" text-lg "> Playlist is empty!</h1>
        </div>
      ) : (
        <SongCardContaier>
          {playlist.map((song, idx) => (
            <SongCards
              key={idx}
              songs={song}
              updateState={(id: string) => {
                setPlaylist((prev) => prev.filter((x) => x.id !== id));
              }}
            />
          ))}
        </SongCardContaier>
      )}
    </>
  );
}
