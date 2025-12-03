"use client";

import { ShowSongDetails } from "@/components/dashboard/music/showSongDetail";
import { SongCards, SongsSection } from "@/components/dashboard/music/songCard";
import { SongHorizontalCard } from "@/components/dashboard/music/songHorizontalCard";
import { BASE_URL } from "@/lib/baseUrl";
import { ISongAlbum } from "@/types/albumType";
import { ISong } from "@/types/songType";
import { MoreSkeletonCard } from "@/ui/cardSkeleton";
import { DisplaySongSkeleton } from "@/ui/displaySongSkeleton";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Songs() {
  const param = useParams();
  const [album, setAlbum] = useState<ISongAlbum | null>(null);
  const [songReco, setSongReco] = useState<ISong[]>([]);
  const [trendingSong, setTrendingSong] = useState<ISong[]>([]);
  const [song, setSong] = useState<ISong>();
  useEffect(() => {
    const fetchDetail = async () => {
      const limit = 10;
      const page = 0;
      const [albums, songDetail] = await Promise.all([
        (
          await axios.get(
            `${BASE_URL}/album/?songToken=${param.songToken}&albumToken=${param.albumToken}`
          )
        ).data,
        (await axios.get(`${BASE_URL}/song/${param.songToken}`)).data,
      ]);

      const [songRecos, trendingSongs] = await Promise.all([
        (await axios.get(`${BASE_URL}/song/reco/${songDetail.id}`)).data,
        (
          await axios.get(
            `${BASE_URL}/song/trendingSong/?limit=${limit}&page=${page}&language=${songDetail.language}`
          )
        ).data,
      ]);
      setAlbum(albums);
      setSongReco(songRecos);
      setTrendingSong(trendingSongs);
      setSong(songDetail);
    };
    fetchDetail();
  }, []);

  return (
    <div className=" pb-18 px-4 ">
      {!song ? (
        <DisplaySongSkeleton />
      ) : (
        <ShowSongDetails
          image={song.image}
          title={song.title}
          song_url={song.perma_url}
          album_url={song.more_info.album_url}
          subtitle={`${
            song.more_info.album
          } by ${song.more_info.artistMap.artists
            .map((x) => x.name)
            .join(", ")}`}
          language={song.language}
          type={song.type}
          duration={song.more_info.duration}
        />
      )}

      <div className=" mt-8 flex flex-col gap-4  ">
        {album && (
          <div className=" flex flex-col gap-4 md:px-12 mb-4 ">
            <h1 className=" font-bold text-2xl line-clamp-1 max-w-[30rem] ">
              More from {album?.title}
            </h1>
            {album?.list.map((item, index) => (
              <SongHorizontalCard
                key={index}
                type={item.type}
                song_url={item.perma_url}
                album_url={item.more_info.album_url}
                serialNumber={index + 1}
                id={item.id}
                image={item.image}
                title={item.title}
                artist={item.more_info.artistMap.artists
                  .map((x) => x.name)
                  .join(",")}
                duration={item.more_info.duration}
              />
            ))}
          </div>
        )}
        <SongsSection heading="You Might Like">
          {songReco.length === 0 ? (
            <MoreSkeletonCard count={10} />
          ) : (
            songReco.map((item, index) => (
              <SongCards key={index} songs={item} />
            ))
          )}
        </SongsSection>
        <SongsSection heading="Trending Songs">
          {trendingSong.length === 0 ? (
            <MoreSkeletonCard count={10} />
          ) : (
            trendingSong.map((item, index) => (
              <SongCards key={index} songs={item} />
            ))
          )}
        </SongsSection>
      </div>
    </div>
  );
}
