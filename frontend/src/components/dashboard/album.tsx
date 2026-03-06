"use client";
import {
  ArtistCard,
  ArtistCardContaier,
} from "@/components/dashboard/music/artistCard";
import { SongCards, SongsSection } from "@/components/dashboard/music/songCard";
import { SongHorizontalCard } from "@/components/dashboard/music/songHorizontalCard";
import { IAlbum, IAlbumSong } from "@/types/albumType";
import { useEffect, useState } from "react";
import { ShowDetailsContainer } from "./showSongDetailsContainer";
import { useSongStore } from "@/store/songStore";
import { useAlbumStore } from "@/store/albumStore";
import { useDisplayedItemStore } from "@/store/displayedItemStore";

export function AlbumComponent({
  album,
  albumReco,
  trendingAlbum,
}: {
  album: IAlbumSong;
  albumReco: IAlbum[];
  trendingAlbum: IAlbum[];
}) {
  const addSongs = useSongStore((s) => s.actions.addSongs);
  const { addAlbum, addAlbumReco, addTrendingAlbum } = useAlbumStore(
    (s) => s.actions,
  );
  const addDisplayedItem = useDisplayedItemStore(
    (s) => s.actions.addDisplayedItem,
  );
  useEffect(() => {
    addSongs(album.list);
    addDisplayedItem({
      type: album.type,
      id: album.id,
    });
    addAlbum([
      {
        id: album.id,
        title: album.title,
        subtitle: album.subtitle,
        language: album.language,
        list_count: album.list_count,
        type: album.type,
        perma_url: album.perma_url,
        image: album.image,
        isLiked: album.isLiked,
      },
    ]);
    addAlbumReco(albumReco);
    addTrendingAlbum(trendingAlbum);
  }, []);

  return (
    <div className=" pb-18 md:px-4 ">
      <ShowDetailsContainer />

      <div className="mt-8  px-4 md:px-12  ">
        <h1 className="text-xl font-semibold line-clamp-1 max-w-[26rem]  ">
          Songs From {album?.title}
        </h1>
        <div className="mt-4 flex flex-col gap-2 ">
          {album.list.map((items, index) => (
            <SongHorizontalCard
              key={index}
              serialNumber={index + 1}
              songId={items.id}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-8 ">
        <SongsSection heading="You Might Like">
          {albumReco.map((items, index) => (
            <SongCards
              key={index}
              type={items.type}
              id={items.id}
              className=" min-w-[12rem]"
            />
          ))}
        </SongsSection>
        <SongsSection heading="Trending Album">
          {trendingAlbum.map((items, index) => (
            <SongCards
              key={index}
              type={items.type}
              id={items.id}
              className=" min-w-[12rem]"
            />
          ))}
        </SongsSection>

        <SongsSection heading="Artists">
          <ArtistCardContaier>
            {album.more_info.artistMap.primary_artists.map((artist, index) => (
              <ArtistCard
                key={index}
                name={artist.name}
                url={artist.perma_url}
                type={artist.type}
                image={artist.image}
              />
            ))}
          </ArtistCardContaier>
        </SongsSection>
      </div>
    </div>
  );
}
