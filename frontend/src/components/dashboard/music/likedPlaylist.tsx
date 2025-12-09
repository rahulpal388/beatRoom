import { IPlaylist } from "@/types/playlistType";
import { SetStateAction, useEffect, useState } from "react";
import { SongCardContaier } from "./songCardContainer";
import { SongCards } from "./songCard";
import axios from "axios";
import { BASE_URL } from "@/lib/baseUrl";

export function LikedPlaylist() {
  const [playlist, setPlaylist] = useState<IPlaylist[]>([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      const response = await axios.get(`${BASE_URL}/playlist/save`, {
        withCredentials: true,
      });
      console.log(response.data);
      setPlaylist(response.data);
    };
    fetchPlaylist();
  }, []);

  return (
    <>
      {playlist.length == 0 ? (
        <div className=" py-[4rem] flex items-center justify-center  ">
          <h1 className=" text-lg ">Liked Playlist is empty!</h1>
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
