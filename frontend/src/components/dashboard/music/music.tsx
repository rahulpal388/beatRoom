import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MusicBanner } from "./musicBanner";
import { SongCards, SongsSection } from "./songCard";
import axios from "axios";
import { BASE_URL } from "@/lib/baseUrl";
import { INewRelease, ISong } from "@/types/songType";
import { ITopArtist } from "@/types/artistType";
import { IPlaylist } from "@/types/playlistType";
import { ArtistCard, ArtistCardContaier } from "./artistCard";
import { CardSkeleton, MoreSkeletonCard } from "@/ui/cardSkeleton";
import { MoreArtistCardSkeleton } from "@/ui/artistCardSkeleton";

export function Music() {
  const [newReleased, setNewReleased] = useState<INewRelease[]>([]);
  const [trendingSong, setTrending] = useState<ISong[]>([]);
  const [topPlaylist, setTopPlaylist] = useState<IPlaylist[]>([]);
  const [topArtist, setTopArtist] = useState<ITopArtist[]>([]);

  useEffect(() => {
    const getPlaylist = async () => {
      const [newReleased, trending, playlist, artist] = await Promise.all([
        axios.get(`${BASE_URL}/song/newReleased/?limit=14&page=1`),
        axios.get(
          `${BASE_URL}/song/trendingSong/?limit=10&page=1&language=hindi`
        ),
        axios.get(`${BASE_URL}/playlist/?limit=10&page=1`),
        axios.get(`${BASE_URL}/artist/topArtist/?limit=10`),
      ]);

      setNewReleased(newReleased.data);
      setTrending(trending.data);
      setTopPlaylist(playlist.data);
      setTopArtist(artist.data);
      console.log(newReleased.data);
    };

    getPlaylist();
  }, []);

  return (
    <>
      <div className=" flex flex-col gap-4  w-full lg:pb-20 pb-32   ">
        {newReleased.length > 0 && (
          <MusicBanner song={newReleased.slice(0, 5)} />
        )}
        <SongsSection heading="New Released">
          {newReleased.length === 0 ? (
            <MoreSkeletonCard count={10} />
          ) : (
            newReleased
              .slice(5)
              .map((items, index) => (
                <SongCards
                  key={items.id}
                  id={items.id}
                  song_url={items.type === "song" ? items.perma_url : ""}
                  type={items.type}
                  album_url={
                    items.type === "song"
                      ? items.more_info.album_url!
                      : items.perma_url
                  }
                  title={items.title}
                  artist={items.more_info.artistMap.artists
                    .map((x) => x.name)
                    .join(",")}
                  image={items.image}
                />
              ))
          )}
        </SongsSection>
        <SongsSection heading="Trending Song">
          {trendingSong.length === 0 ? (
            <MoreSkeletonCard count={10} />
          ) : (
            trendingSong.map((items, index) => (
              <SongCards
                key={items.id}
                id={items.id}
                type={items.type}
                song_url={items.perma_url}
                album_url={items.more_info.album_url || ""}
                title={items.title}
                artist={items.more_info.artistMap.artists
                  .map((x) => x.name)
                  .join(",")}
                image={items.image}
              />
            ))
          )}
        </SongsSection>
        <SongsSection heading="Top Playlist">
          {topPlaylist.length === 0 ? (
            <MoreSkeletonCard count={10} />
          ) : (
            topPlaylist.map((items, index) => (
              <SongCards
                key={items.id}
                id={items.id}
                song_url={items.perma_url}
                album_url=""
                type={items.type}
                title={items.title}
                artist={items.subtitle}
                image={items.image}
              />
            ))
          )}
        </SongsSection>
        <SongsSection heading="Top Artists">
          <ArtistCardContaier>
            {topArtist.length === 0 ? (
              <MoreArtistCardSkeleton count={6} />
            ) : (
              topArtist.map((item, index) => (
                <ArtistCard
                  key={index}
                  name={item.name}
                  url={item.perma_url}
                  image={item.image}
                  type={"artist"}
                />
              ))
            )}
          </ArtistCardContaier>
        </SongsSection>
      </div>
    </>
  );
}
