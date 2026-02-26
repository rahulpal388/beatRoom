"use client";

import { getPlaylistReco } from "@/api/playlist/getPlaylistReco";
import { getPlaylistSong } from "@/api/playlist/getPlaylistSong";
import { getTrendingPlaylist } from "@/api/playlist/getTrendingPlaylist";
import { getUserSavedPlaylistInfo } from "@/api/playlist/getUserSavedPlaylist";
import {
  ArtistCard,
  ArtistCardContaier,
} from "@/components/dashboard/music/artistCard";
import { ShowSongDetails } from "@/components/dashboard/music/showSongDetail";
import { SongCards, SongsSection } from "@/components/dashboard/music/songCard";
import { SongHorizontalCard } from "@/components/dashboard/music/songHorizontalCard";
import { IPlaylist, IPlaylistSong } from "@/types/playlistType";
import { MoreArtistCardSkeleton } from "@/ui/artistCardSkeleton";
import { MoreSkeletonCard } from "@/ui/cardSkeleton";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlaylistPage() {
  const { playlistToken } = useParams();
  const [playlist, setPlaylist] = useState<IPlaylistSong | null>(null);
  const [playlistReco, setPlaylistReco] = useState<IPlaylist[]>([]);
  const [playlistTrending, setPlaylistTrending] = useState<IPlaylist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      const isNumeric = /^\d+$/.test(playlistToken as string);
      const responsePlaylist = isNumeric
        ? await getUserSavedPlaylistInfo(playlistToken as string)
        : await getPlaylistSong(playlistToken as string);

      setPlaylist(responsePlaylist);
      if (!responsePlaylist) {
        return;
      }
      const [responseReco, responseTrending] = await Promise.all([
        getPlaylistReco(10, 1, responsePlaylist.id),
        getTrendingPlaylist(10, 1, responsePlaylist.language),
      ]);

      setPlaylistReco(responseReco);
      setPlaylistTrending(responseTrending);
      setIsLoading(false);
    };

    fetchPlaylist();
  }, [playlistToken]);

  return (
    <div className=" pb-18 md:px-4 px-px ">
      <div>{playlist && <ShowSongDetails items={playlist} />}</div>

      {!isLoading && (
        <div className="mt-8 md:px-12 px-4 ">
          <h1 className="text-xl font-semibold line-clamp-1 max-w-[30rem]  ">
            Songs From {playlist?.title}
          </h1>
          <div className="mt-4 flex flex-col gap-2 ">
            {playlist?.list.map((items, index) => (
              <SongHorizontalCard
                key={index}
                serialNumber={index + 1}
                songs={items}
                updateState={(id: string) => {
                  setPlaylist((prev) => {
                    if (!prev) return prev;
                    return {
                      ...prev,
                      list: prev?.list.map((x) =>
                        x.id === id ? { ...x, isLiked: !x.isLiked } : x,
                      ),
                    };
                  });
                }}
              />
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 mt-8 ">
        {playlist?.type === "playlist" && (
          <div>
            <SongsSection heading="You Might Like">
              {isLoading ? (
                <MoreSkeletonCard count={10} />
              ) : (
                playlistReco.map((items, index) => (
                  <SongCards
                    key={index}
                    songs={items}
                    updateState={(id: string) =>
                      setPlaylistReco((prev) =>
                        prev.map((x) =>
                          x.id === id ? { ...x, isLiked: !x.isLiked } : x,
                        ),
                      )
                    }
                  />
                ))
              )}
            </SongsSection>
            <SongsSection heading="Trending Playlist">
              {isLoading ? (
                <MoreSkeletonCard count={10} />
              ) : (
                playlistTrending.map((items, index) => (
                  <SongCards
                    key={index}
                    songs={items}
                    updateState={(id: string) => {
                      setPlaylistTrending((prev) =>
                        prev.map((x) =>
                          x.id === id ? { ...x, isliked: !x.isLiked } : x,
                        ),
                      );
                    }}
                  />
                ))
              )}
            </SongsSection>
          </div>
        )}
        <SongsSection heading="Artists">
          <ArtistCardContaier>
            {!playlist ? (
              <MoreArtistCardSkeleton count={6} />
            ) : (
              playlist.more_info.artists.map((artist, index) => (
                <ArtistCard
                  key={index}
                  name={artist.name}
                  url={artist.perma_url}
                  type={artist.type}
                  image={artist.image}
                />
              ))
            )}
          </ArtistCardContaier>
        </SongsSection>
      </div>
    </div>
  );
}
