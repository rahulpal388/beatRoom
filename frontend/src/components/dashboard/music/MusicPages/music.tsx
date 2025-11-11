import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ArtistPlaylist, artistPlaylist } from "../artistPlaylist";
import { MusicBanner } from "./musicBanner";
import { SongCards, SongsSection } from "../songCard";
import axios from "axios";
import { BASE_URL } from "@/lib/baseUrl";
import { INewRelease, ISong } from "@/types/songType";
import { ITopArtist } from "@/types/artistType";
import { IPlaylist } from "@/types/playlistType";

export function Music() {
  const [newReleased, setNewReleased] = useState<INewRelease[]>([]);
  const [trendingSong, setTrending] = useState<ISong[]>([]);
  const [topPlaylist, setTopPlaylist] = useState<IPlaylist[]>([]);
  const [topArtist, setTopArtist] = useState<ITopArtist[]>([]);

  // new Released
  // trending song
  // top playlist
  // top artists

  useEffect(() => {
    const getPlaylist = async () => {
      const [newReleased, trending, playlist, artist] = await Promise.all([
        axios.get(`${BASE_URL}/song/newReleased/?limit=14&page=1`),
        axios.get(
          `${BASE_URL}/song/trendingSong/?limit=10&page=1&language=hindi`
        ),
        axios.get(`${BASE_URL}/playlist/?limit=10&page=1`),
        axios.get(`${BASE_URL}/artist/?limit=10`),
      ]);

      setNewReleased(newReleased.data);
      setTrending(trending.data);
      setTopPlaylist(playlist.data);
      setTopArtist(artist.data);
    };

    getPlaylist();
  }, []);

  // console.log(newReleased);
  return (
    <>
      <div className=" flex flex-col gap-4  w-full   ">
        {newReleased.length > 0 && (
          <MusicBanner song={newReleased.slice(0, 5)} />
        )}
        <SongsSection heading="New Released">
          {newReleased.slice(5).map((items, index) => (
            <SongCards
              id={items.id}
              title={items.title}
              artist={items.more_info.artistMap.artists
                .map((x) => x.name)
                .join(",")}
              image={items.image}
            />
          ))}
        </SongsSection>
        <SongsSection heading="Trending Song">
          {trendingSong.map((items, index) => (
            <SongCards
              id={items.id}
              title={items.title}
              artist={items.more_info.artistMap.artists
                .map((x) => x.name)
                .join(",")}
              image={items.image}
            />
          ))}
        </SongsSection>
        <SongsSection heading="Top Playlist">
          {topPlaylist.map((items, index) => (
            <SongCards
              id={items.id}
              title={items.title}
              artist={""}
              image={items.image}
            />
          ))}
        </SongsSection>
        <SongsSection heading="Top Artists">
          <div className=" mt-2 w-full grid lg:grid-cols-2 grid-cols-1  items-center gap-6 justify-between ">
            {topArtist.map((item, index) => (
              <ArtistPlaylist
                key={index}
                name={item.name}
                image={item.image}
                type={"artist"}
              />
            ))}
          </div>
        </SongsSection>
      </div>
    </>
  );
}
