import { useEffect, useState } from "react";
import { MusicBanner } from "./musicBanner";
import { SongCards, SongsSection } from "./songCard";
import axios from "axios";

import { INewReleaseSong, ISong } from "@/types/songType";
import { IArtists } from "@/types/artistType";
import { IPlaylist } from "@/types/playlistType";
import { ArtistCard, ArtistCardContaier } from "./artistCard";
import { MoreSkeletonCard } from "@/ui/cardSkeleton";
import { MoreArtistCardSkeleton } from "@/ui/artistCardSkeleton";
import { getNewReleasedSong } from "@/api/song/newReleasedSong";
import { getTrendingSong } from "@/api/song/trendingSong";
import { getTopPlaylist } from "@/api/playlist/getTopPlaylist";
import { getTopArtist } from "@/api/artist/getTopArtist";

export function Music() {
  const [newReleased, setNewReleased] = useState<INewReleaseSong[]>([]);
  const [trendingSong, setTrending] = useState<ISong[]>([]);
  const [topPlaylist, setTopPlaylist] = useState<IPlaylist[]>([]);
  const [topArtist, setTopArtist] = useState<IArtists[]>([]);

  useEffect(() => {
    const getPlaylist = async () => {
      const [newReleased, trending, playlist, artist] = await Promise.all([
        getNewReleasedSong(14, 1),
        getTrendingSong(10, 1, "hindi"),
        getTopPlaylist(10, 1),
        getTopArtist(10, 0)

      ]);

      setNewReleased(newReleased);
      setTrending(trending);
      setTopPlaylist(playlist);
      setTopArtist(artist);
      console.log("trending songs")
      console.log(trending);
    };

    getPlaylist();
  }, []);

  return (
    <>
      <div className=" pt-4 flex flex-col gap-4  w-full lg:pb-20 pb-32   ">
        {/* {newReleased.length > 0 && (
          <MusicBanner song={newReleased.slice(0, 5)} />
        )} */}
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
