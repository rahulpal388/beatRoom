"use client";

import {
  ArtistCard,
  ArtistCardContaier,
} from "@/components/dashboard/music/artistCard";
import { ShowSongDetails } from "@/components/dashboard/music/showSongDetail";
import { SongCards, SongsSection } from "@/components/dashboard/music/songCard";
import { SongHorizontalCard } from "@/components/dashboard/music/songHorizontalCard";
import { IPlaylist, ISongsPlaylist } from "@/types/playlistType";
import { MoreArtistCardSkeleton } from "@/ui/artistCardSkeleton";
import { MoreSkeletonCard } from "@/ui/cardSkeleton";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlaylistPage() {
  const { playlistToken } = useParams();
  const [playlist, setPlaylist] = useState<ISongsPlaylist | null>(null);
  const [playlistReco, setPlaylistReco] = useState<IPlaylist[]>([]);
  const [playlistTrending, setPlaylistTrending] = useState<IPlaylist[]>([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      const responsePlaylist = (
        await axios.get(
          `http://localhost:8080/api/v1/playlist/${playlistToken}`
        )
      ).data as ISongsPlaylist;
      setPlaylist(responsePlaylist);

      const [responseReco, responseTrending] = await Promise.all([
        await axios.get(
          `http://localhost:8080/api/v1/playlist/reco/?page=0&limit=10&listid=${responsePlaylist.id}`
        ),
        await axios.get(
          `http://localhost:8080/api/v1/playlist/trendingPlaylist/?limit=10&page=0&language=${responsePlaylist.language}`
        ),
      ]);

      setPlaylistReco(responseReco.data);
      setPlaylistTrending(responseTrending.data);
      console.log(responseTrending.data);
    };

    fetchPlaylist();
  }, []);

  return (
    <div className=" pb-18 md:px-4 px-px ">
      <div>
        {playlist && (
          <ShowSongDetails
            image={playlist.image}
            title={playlist.title}
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
              id={items.id}
              type={items.type}
              title={items.title}
              image={items.image}
              duration={items.more_info.duration}
              song_url={items.perma_url}
              album_url={items.more_info.album_url}
              artist={items.more_info.artistMap.artists
                .map((x) => x.name)
                .join(", ")}
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
              <SongCards key={index} songs={items} />
            ))
          )}
        </SongsSection>
        <SongsSection heading="Trending Playlist">
          {playlistTrending.length === 0 ? (
            <MoreSkeletonCard count={10} />
          ) : (
            playlistTrending.map((items, index) => (
              <SongCards key={index} songs={items} />
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
