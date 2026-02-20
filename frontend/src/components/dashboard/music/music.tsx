import { useEffect, useState } from "react";
import { MusicBanner } from "./musicBanner";
import { SongCards, SongsSection } from "./songCard";
import axios from "axios";
import { api } from "@/lib/checkEnv";

import { ISong } from "@/types/songType";
import { IArtists } from "@/types/artistType";
import { IPlaylist } from "@/types/playlistType";
import { ArtistCard, ArtistCardContaier } from "./artistCard";
import { MoreSkeletonCard } from "@/ui/cardSkeleton";
import { MoreArtistCardSkeleton } from "@/ui/artistCardSkeleton";

export function Music() {
  const [newReleased, setNewReleased] = useState<ISong[]>([]);
  const [trendingSong, setTrending] = useState<ISong[]>([]);
  const [topPlaylist, setTopPlaylist] = useState<IPlaylist[]>([]);
  const [topArtist, setTopArtist] = useState<IArtists[]>([]);

  useEffect(() => {
    const getPlaylist = async () => {
      const [newReleased, trending, playlist, artist] = await Promise.all([
        axios.get(`${api}/song/newReleased/?limit=14&page=1`, {
          withCredentials: true,
        }),
        axios.get(
          `${api}/song/trendingSong/?limit=10&page=1&language=hindi`,
          { withCredentials: true }
        ),
        axios.get(`${api}/playlist/?limit=10&page=1`, {
          withCredentials: true,
        }),
        axios.get(`${api}/artist/topArtist/?limit=10&page=1`, {
          withCredentials: true,
        }),
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
            newReleased.slice(5).map((items) => (
              <SongCards
                key={items.id}
                songs={items}
                updateState={(id: string) => {
                  setNewReleased((prev) =>
                    prev.map((x) =>
                      x.id === id ? { ...x, isLiked: !x.isLiked } : x
                    )
                  );
                }}
              />
            ))
          )}
        </SongsSection>
        <SongsSection heading="Trending Song">
          {trendingSong.length === 0 ? (
            <MoreSkeletonCard count={10} />
          ) : (
            trendingSong.map((items) => (
              <SongCards
                key={items.id}
                songs={items}
                updateState={(id: string) => {
                  setTrending((prev) =>
                    prev.map((x) =>
                      x.id === id ? { ...x, isLiked: !x.isLiked } : x
                    )
                  );
                }}
              />
            ))
          )}
        </SongsSection>
        <SongsSection heading="Top Playlist">
          {topPlaylist.length === 0 ? (
            <MoreSkeletonCard count={10} />
          ) : (
            topPlaylist.map((items) => (
              <SongCards
                key={items.id}
                songs={items}
                updateState={(id: string) => {
                  setTopPlaylist((prev) =>
                    prev.map((x) =>
                      x.id === id ? { ...x, isLiked: !x.isLiked } : x
                    )
                  );
                }}
              />
            ))
          )}
        </SongsSection>
        <SongsSection heading="Top Artists">
          <ArtistCardContaier>
            {topArtist.length === 0 ? (
              <MoreArtistCardSkeleton count={6} />
            ) : (
              topArtist.map((item) => (
                <ArtistCard
                  key={item.id}
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
