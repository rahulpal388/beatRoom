"use client";

import { getPlaylistReco } from "@/api/playlist/getPlaylistReco";
import { getPlaylistSong } from "@/api/playlist/getPlaylistSong";
import { getTrendingPlaylist } from "@/api/playlist/getTrendingPlaylist";
import { getUserSavedPlaylistInfo } from "@/api/playlist/getUserSavedPlaylist";
import {
  ArtistCard,
  ArtistCardContaier,
} from "@/components/dashboard/music/artistCard";
import { SongCards, SongsSection } from "@/components/dashboard/music/songCard";
import { SongHorizontalCard } from "@/components/dashboard/music/songHorizontalCard";
import { IPlaylist, IPlaylistSong } from "@/types/playlistType";
import { MoreArtistCardSkeleton } from "@/ui/artistCardSkeleton";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ShowDetailsContainer } from "./showSongDetailsContainer";
import { SongHorizontalContainer } from "./music/songHorizontalContainer";
import { usePlaylistStore } from "@/store/playlistStore";
import { useDisplayedItemStore } from "@/store/displayedItemStore";
import { useSongStore } from "@/store/songStore";
import { Container } from "../container";

export default function Playlist({
  playlist,
  playlistReco,
  trendingPlaylist,
}: {
  playlist: IPlaylistSong;
  playlistReco: IPlaylist[];
  trendingPlaylist: IPlaylist[];
}) {
  const { addDisplayedItem } = useDisplayedItemStore((s) => s.actions);
  const { addPlaylist, addPlaylistReco, addTrendingPlaylist } =
    usePlaylistStore((s) => s.actions);
  const { addListSong } = useSongStore((s) => s.actions);

  console.log(playlist);
  useEffect(() => {
    addPlaylist([
      {
        id: playlist.id,
        title: playlist.title,
        subtitle: playlist.subtitle,
        type: playlist.type,
        perma_url: playlist.perma_url,
        image: playlist.image,
        isLiked: playlist.isLiked,
        list_count: playlist.list_count,
        language: playlist.language,
      },
    ]);
    addDisplayedItem({
      type: playlist.type,
      id: playlist.id,
    });
    addPlaylistReco(playlistReco);
    addTrendingPlaylist(trendingPlaylist);
    addListSong(playlist.list);
  }, []);

  return (
    <Container>
      <ShowDetailsContainer />

      <SongHorizontalContainer title={playlist.title} className=" mt-4">
        {playlist.list.map((item, index) => (
          <SongHorizontalCard
            key={index}
            serialNumber={index + 1}
            songId={item.id}
          />
        ))}
      </SongHorizontalContainer>

      <div className="flex flex-col gap-4 mt-8 ">
        <div className=" flex flex-col gap-4 ">
          <SongsSection heading="You Might Like">
            {playlistReco.map((item, index) => (
              <SongCards
                key={index}
                id={item.id}
                type={item.type}
                className=" min-w-[12rem]"
              />
            ))}
          </SongsSection>
          <SongsSection heading="You Might Like">
            {trendingPlaylist.map((item, index) => (
              <SongCards
                key={index}
                id={item.id}
                type={item.type}
                className=" min-w-[12rem]"
              />
            ))}
          </SongsSection>
        </div>

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
    </Container>
  );
}
