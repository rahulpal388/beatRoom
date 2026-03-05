'use client'
import { ISong } from "@/types/songType";
import { SongCards, SongsSection } from "./music/songCard";
import { SongHorizontalCard } from "./music/songHorizontalCard";
import { SongHorizontalContainer } from "./music/songHorizontalContainer";
import { IAlbumSong } from "@/types/albumType";
import { ShowDetailsContainer } from "./showSongDetailsContainer";
import { useDisplayedItemStore } from "@/store/displayedItemStore";
import { useSongStore } from "@/store/songStore";
import { useEffect, useRef } from "react";

export function Song({
  songDetail,
  albums,
  trendingSongs,
  songBySameArtist,
}: {
  songDetail: ISong;
  albums: IAlbumSong | null;
  trendingSongs: ISong[];
  songBySameArtist: ISong[];
}) {

  const isHydrated = useRef(false);
  const addDisplayedItem = useDisplayedItemStore(state => state.actions.addDisplayedItem)
  const { addSongs, addListSong, addTrendingSong, addSongBySameArtist } = useSongStore(s => s.actions)

  if (!isHydrated.current) {

    addSongs([songDetail]);
    if (albums) {
      addListSong(albums.list)
    }
    addTrendingSong(trendingSongs);
    addSongBySameArtist(songBySameArtist)
    addDisplayedItem({
      type: songDetail.type,
      id: songDetail.id
    })
    isHydrated.current = true
  }
  return (
    <div className=" lg:pb-18 pb-32 md:px-4 ">
      <ShowDetailsContainer id={songDetail.id} type={songDetail.type} />
      <div className=" mt-8 flex flex-col gap-4  ">
        {albums && (
          <SongHorizontalContainer title={albums.title}>
            {albums.list.map((item, index) => (
              <SongHorizontalCard
                key={index}
                serialNumber={index + 1}
                songId={item.id}
              />
            ))}
          </SongHorizontalContainer>
        )}

        <SongsSection heading="Trending Songs">
          {trendingSongs.map((item, index) => (
            <SongCards key={index} id={item.id} type={item.type} />
          ))}
        </SongsSection>
        <SongsSection heading="Song By Same Artist">
          {songBySameArtist.map((item, index) => (
            <SongCards key={index} id={item.id} type={item.type} />
          ))}
        </SongsSection>
      </div>
    </div>
  );
}
