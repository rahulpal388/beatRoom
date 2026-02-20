import { IAlbum } from "@/types/albumType";
import { SetStateAction, useEffect, useState } from "react";
import { SongCardContaier } from "./songCardContainer";
import { SongCards } from "./songCard";
import axios from "axios";
import { api } from "@/lib/checkEnv";


export function LikedAlbum() {
  const [album, setAlbum] = useState<IAlbum[]>([]);



  useEffect(() => {
    const fetchAlbum = async () => {
      const response = await axios.get(`${api}/album/save`, {
        withCredentials: true,
      });
      console.log(response.data);
      setAlbum(response.data);
    };
    fetchAlbum();
  }, []);




  return (
    <>
      {album.length == 0 ? (
        <div className=" py-[4rem] flex items-center justify-center  ">
          <h1 className=" text-lg ">Album is empty!</h1>
        </div>
      ) : (
        <SongCardContaier>
          {album.map((song, idx) => (
            <SongCards
              key={idx}
              songs={song}
              updateState={(id: string) => {
                setAlbum((prev) => prev.filter((x) => x.id !== id));
              }}
            />
          ))}
        </SongCardContaier>
      )}
    </>
  );
}
