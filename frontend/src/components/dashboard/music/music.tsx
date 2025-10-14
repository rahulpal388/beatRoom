import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ArtistPlaylist, artistPlaylist } from "./artistPlaylist";
import { MusicBanner } from "./musicBanner";
import { SongCards, SongsSection } from "./songCard";
import axios from "axios";
import { BASE_URL } from "@/lib/baseUrl";
import { TCurrentSong } from "@/app/dashboard/[userId]/page";
import Preview from "react-player/Preview";
import { useCurrentSongDetail } from "@/context/currentSong";
import { useQueue } from "@/context/queueContext";

export type TSong = {
  id: string;
  title: string;
  type: string;
  image: string;
  duration: string;
  artist: string;
};

type TPlaylist = {
  indiePlaylist?: TSong[];
  punjabiPlaylist?: TSong[];
  romanticPlaylist?: TSong[];
  bhojpuriPlaylist?: TSong[];
};

export function Music({ type }: { type: "searched" | "notSearched" }) {
  const [playlist, setPlaylist] = useState<TPlaylist | null>(null);
  const { setCurrentSong, setIsPlaying } = useCurrentSongDetail();
  const { setQueueSongs } = useQueue();

  useEffect(() => {
    // 107605145 => indie
    // 1134543511 => punjabi
    // 1134768973 => bhojpuri
    // 1139074020 => romantic

    const getPlaylist = async () => {
      const page = 0;
      const limit = 10;
      const indie = 107605145;
      const punjabi = 1134543511;
      const romantic = 1139074020;
      const bhojpuri = 1134768973;

      const indiePlaylist = (
        await axios.get(
          `${BASE_URL}/song/playlist/${indie}?page=${page}&limit=${limit}`,
          { withCredentials: true }
        )
      ).data.songs;

      const punjabiPlaylist = (
        await axios.get(
          `${BASE_URL}/song/playlist/${punjabi}?page=${page}&limit=${limit}`,
          { withCredentials: true }
        )
      ).data.songs;

      const romanticPlaylist = (
        await axios.get(
          `${BASE_URL}/song/playlist/${romantic}?page=${page}&limit=${limit}`,
          { withCredentials: true }
        )
      ).data.songs;

      const bhojpuriPlaylist = await (
        await axios.get(
          `${BASE_URL}/song/playlist/${bhojpuri}?page=${page}&limit=${limit}`,
          { withCredentials: true }
        )
      ).data.songs;

      setPlaylist({
        indiePlaylist,
        punjabiPlaylist,
        romanticPlaylist,
        bhojpuriPlaylist,
      });
    };

    getPlaylist();
  }, []);

  return (
    <>
      <div className=" h-[18rem] dark:shadow-2xl   rounded-lg overflow-hidden ">
        {type === "notSearched" && <MusicBanner />}
      </div>
      <SongsSection
        setIsPlaying={setIsPlaying}
        setCurrentSong={setCurrentSong}
        setQueueSongs={setQueueSongs}
        heading="Indi Songs"
        songs={playlist?.indiePlaylist}
      />
      <SongsSection
        setIsPlaying={setIsPlaying}
        setCurrentSong={setCurrentSong}
        setQueueSongs={setQueueSongs}
        heading="Punjabi Songs"
        songs={playlist?.punjabiPlaylist}
      />
      <SongsSection
        setIsPlaying={setIsPlaying}
        setCurrentSong={setCurrentSong}
        setQueueSongs={setQueueSongs}
        heading="Romantic Songs"
        songs={playlist?.romanticPlaylist}
      />
      <SongsSection
        setIsPlaying={setIsPlaying}
        setCurrentSong={setCurrentSong}
        setQueueSongs={setQueueSongs}
        heading="Bhojpuri Songs"
        songs={playlist?.bhojpuriPlaylist}
      />
      <div className=" rounded-lg  px-4 py-2  dark:shadow-2xl  ">
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
    </>
  );
}
