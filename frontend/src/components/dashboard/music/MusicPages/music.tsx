import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ArtistPlaylist, artistPlaylist } from "../artistPlaylist";
import { MusicBanner } from "./musicBanner";
import { SongCards, SongsSection } from "../songCard";
import axios from "axios";
import { BASE_URL } from "@/lib/baseUrl";
import { TCurrentSong } from "@/app/dashboard/[userId]/page";
import Preview from "react-player/Preview";
import { useCurrentSongDetail } from "@/context/currentSong";
import { useQueue } from "@/context/queueContext";

export type TSong = {
  id: string;
  image: string;
  title: string;
  artist: string;
  url: string;
  albumid: string;
  album_url: string;
  language: string;
};

type TPlaylist = {
  indiePlaylist?: TSong[];
  punjabiPlaylist?: TSong[];
  romanticPlaylist?: TSong[];
  bhojpuriPlaylist?: TSong[];
};

export function Music() {
  const [playlist, setPlaylist] = useState<TPlaylist | null>(null);

  useEffect(() => {
    const getPlaylist = async () => {
      const response = (
        await axios.post(`${BASE_URL}/song/playlist/all`, {
          withCredentials: true,
        })
      ).data;

      setPlaylist({
        indiePlaylist: response.indiePlaylist,
        punjabiPlaylist: response.punjabiPlaylist,
        romanticPlaylist: response.romanticPlaylist,
        bhojpuriPlaylist: response.bhojpuriPlaylist,
      });
    };

    getPlaylist();
  }, []);

  return (
    <>
      <div className=" flex flex-col gap-4 ">
        <MusicBanner />

        <SongsSection heading="Indi Songs">
          {playlist?.indiePlaylist?.map((items, index) => (
            <SongCards id={items.id} title={items.title} artist={items.artist} image={items.image} />
          ))}
        </SongsSection>
        <SongsSection heading="Punjabi Songs">
          {playlist?.punjabiPlaylist?.map((items, index) => (
            <SongCards id={items.id} title={items.title} artist={items.artist} image={items.image} />
          ))}
        </SongsSection>
        <SongsSection heading="Romantic Songs">
          {playlist?.romanticPlaylist?.map((items, index) => (
            <SongCards id={items.id} title={items.title} artist={items.artist} image={items.image} />
          ))}
        </SongsSection>
        <SongsSection heading="Bhojupuri Songs">
          {playlist?.bhojpuriPlaylist?.map((items, index) => (
            <SongCards id={items.id} title={items.title} artist={items.artist} image={items.image} />
          ))}
        </SongsSection>

        <div className=" rounded-lg  px-4 py-2  dark:shadow-2xl mb-28 ">
          <h1 className=" text-xl font-bold font-heading ">Artist Playlist</h1>
          <div className="mt-2 w-full grid lg:grid-cols-2 grid-cols-1  items-center gap-6 justify-between   ">
            {artistPlaylist.map((item, index) => (
              <ArtistPlaylist
                key={index}
                name={item.name}
                image={item.photo}
                type={item.type}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
