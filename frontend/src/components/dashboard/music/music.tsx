"use client";
import { useEffect } from "react";
import { SongCards, SongsSection } from "./songCard";

import { INewReleaseSong, ISong } from "@/types/songType";
import { IArtists } from "@/types/artistType";
import { IPlaylist } from "@/types/playlistType";
import { ArtistCard, ArtistCardContaier } from "./artistCard";
import { useSongStore } from "@/store/songStore";
import { usePlaylistStore } from "@/store/playlistStore";
import { putNewReleaseSongStore } from "@/lib/putNewReleaseSongStore";
import { IRoom, useRoomStore } from "@/store/roomStore";

export function Music({
  newReleased,
  trendingSong,
  topPlaylist,
  topArtist,
  rooms,
}: {
  newReleased: INewReleaseSong[];
  trendingSong: ISong[];
  topPlaylist: IPlaylist[];
  topArtist: IArtists[];
  rooms: IRoom[];
}) {
  const addTrendingSong = useSongStore((s) => s.actions.addTrendingSong);
  const addTopPlaylist = usePlaylistStore((s) => s.actions.addTopPlaylist);
  const addRooms = useRoomStore((s) => s.actions.addRooms);
  useEffect(() => {
    putNewReleaseSongStore(newReleased);
    addTrendingSong(trendingSong);
    addTopPlaylist(topPlaylist);
    addRooms(rooms);
  }, []);

  return (
    <>
      <div className=" pt-4 flex flex-col gap-4  w-full lg:pb-20 pb-32  ">
        {/* {newReleased.length > 0 && (
          <MusicBanner song={newReleased.slice(0, 5)} />
        )} */}
        <SongsSection heading="New Released">
          {newReleased.map((items) => (
            <SongCards
              key={items.id}
              id={items.id}
              type={items.type}
              className=" min-w-[12rem]"
            />
          ))}
        </SongsSection>
        <SongsSection heading="Trending Song">
          {trendingSong.map((items) => (
            <SongCards
              key={items.id}
              id={items.id}
              type={items.type}
              className=" min-w-[12rem]"
            />
          ))}
        </SongsSection>
        <SongsSection heading="Top Playlist">
          {topPlaylist.map((items) => (
            <SongCards
              key={items.id}
              id={items.id}
              type={items.type}
              className=" min-w-[12rem]"
            />
          ))}
        </SongsSection>
        <ArtistCardContaier heading="Top Artists">
          {topArtist.map((item) => (
            <ArtistCard
              key={item.id}
              name={item.name}
              url={item.perma_url}
              image={item.image}
              type={"artist"}
            />
          ))}
        </ArtistCardContaier>
      </div>
    </>
  );
}
