
import { ISong } from "@/types/songType";
import axios from "axios";
import { useEffect, useState } from "react";
import { SongCardContaier } from "./songCardContainer";
import { SongCards } from "./songCard";
import { api } from "@/lib/checkEnv";



export function LikedSong() {
  const [song, setSong] = useState<ISong[]>([]);

  useEffect(() => {
    const fetchSaveSong = async () => {
      const response = await axios.get(`${api}/song/save`, {
        withCredentials: true,
      });
      setSong(response.data);
    };
    fetchSaveSong();
  }, []);

  return (
    <>
      {song.length == 0 ? (
        <div className=" py-[4rem] flex items-center justify-center  ">
          <h1 className=" text-lg ">Song is empty!</h1>
        </div>
      ) : (
        <SongCardContaier>
          {song.map((song, idx) => (
            <SongCards
              key={idx}
              songs={song}
              updateState={(id: string) => {
                setSong((prev) => prev.filter((x) => x.id !== id));
              }}
            />
          ))}
        </SongCardContaier>
      )}
    </>
  );
}
