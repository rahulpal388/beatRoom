"use client";

import { getPlaylistReco } from "@/api/playlist/getPlaylistReco";
import { getPlaylistSong } from "@/api/playlist/getPlaylistSong";
import { getTrendingPlaylist } from "@/api/playlist/getTrendingPlaylist";
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
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlaylistPage() {
  const { playlistToken } = useParams();
  const [playlist, setPlaylist] = useState<IPlaylistSong | null>(null);
  const [playlistReco, setPlaylistReco] = useState<IPlaylist[]>([]);
  const [playlistTrending, setPlaylistTrending] = useState<IPlaylist[]>([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      const responsePlaylist = await getPlaylistSong(playlistToken as string);
      setPlaylist(responsePlaylist);

      const [responseReco, responseTrending] = await Promise.all([
        getPlaylistReco(10, 1, responsePlaylist.id),
        getTrendingPlaylist(10, 1, responsePlaylist.language)
      ]);

      setPlaylistReco(responseReco);
      setPlaylistTrending(responseTrending);
      console.log(responseTrending);
    };

    fetchPlaylist();
  }, [playlistToken]);

  return (
    <div className=" pb-18 md:px-4 px-px ">
      <div>
        {playlist && (
          <ShowSongDetails
            image={playlist.image}
            title={playlist.title}
            songId={playlist.id}
            song_url={playlist.perma_url}
            album_url=""
            subtitle={playlist.subtitle}
            language={playlist.language}
            type={playlist.type}
            duration={`${playlist.list
              .map((x) => Number(x.more_info.duration))
              .reduce((total, num) => total + num, 0)}`}
          />
        )}
      </div>
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
                      x.id === id ? { ...x, isLiked: !x.isLiked } : x
                    ),
                  };
                });
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-8 ">
        <SongsSection heading="You Might Like">
          {playlistReco.length === 0 ? (
            <MoreSkeletonCard count={10} />
          ) : (
            playlistReco.map((items, index) => (
              <SongCards
                key={index}
                songs={items}
                updateState={(id: string) =>
                  setPlaylistReco((prev) =>
                    prev.map((x) =>
                      x.id === id ? { ...x, isLiked: !x.isLiked } : x
                    )
                  )
                }
              />
            ))
          )}
        </SongsSection>
        <SongsSection heading="Trending Playlist">
          {playlistTrending.length === 0 ? (
            <MoreSkeletonCard count={10} />
          ) : (
            playlistTrending.map((items, index) => (
              <SongCards
                key={index}
                songs={items}
                updateState={(id: string) => {
                  setPlaylistTrending((prev) =>
                    prev.map((x) =>
                      x.id === id ? { ...x, isliked: !x.isLiked } : x
                    )
                  );
                }}
              />
            ))
          )}
        </SongsSection>

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
