"use client";

import { ShowSongDetails } from "@/components/dashboard/music/showSongDetail";
import { SongCards, SongsSection } from "@/components/dashboard/music/songCard";
import { SongHorizontalCard } from "@/components/dashboard/music/songHorizontalCard";
import { api } from "@/lib/checkEnv";
import { decodeHTML } from "@/lib/decodeHtml";
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
            `${api}/album/?songToken=${param.songToken}&albumToken=${param.albumToken}`,
            { withCredentials: true }
          )
        ).data,
        (
          await axios.get(`${api}/song/${param.songToken}`, {
            withCredentials: true,
          })
        ).data,
      ]);
      console.log(songDetail);

      const [songRecos, trendingSongs] = await Promise.all([
        (
          await axios.get(`${api}/song/reco/${songDetail.id}`, {
            withCredentials: true,
          })
        ).data,
        (
          await axios.get(
            `${api}/song/trendingSong/?limit=${limit}&page=${page}&language=${songDetail.language}`,
            { withCredentials: true }
          )
        ).data,
      ]);
      setAlbum(albums);
      setSongReco(songRecos);
      setTrendingSong(trendingSongs);
      setSong(songDetail);
    };
    fetchDetail();
  }, [param.albumToken, param.songToken]);

  return (
    <div className=" pb-18 px-4 ">
      {!song ? (
        <DisplaySongSkeleton />
      ) : (
        <ShowSongDetails
          image={song.image}
          title={song.title}
          songId={song.id}
          song_url={song.perma_url}
          album_url={song.more_info.album_url}
          subtitle={`${song.more_info.album
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
              More from {decodeHTML(album?.title)}
            </h1>
            {album?.list.map((item, index) => (
              <SongHorizontalCard
                key={index}
                serialNumber={index + 1}
                songs={item}
                updateState={(id: string) => {
                  setAlbum((prev) => {
                    if (!prev) return null;
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
        )}
        <SongsSection heading="You Might Like">
          {songReco.length === 0 ? (
            <MoreSkeletonCard count={10} />
          ) : (
            songReco.map((item, index) => (
              <SongCards
                key={index}
                songs={item}
                updateState={(id: string) => {
                  setSongReco((prev) =>
                    prev.map((x) =>
                      x.id === id ? { ...x, isLiked: !x.isLiked } : x
                    )
                  );
                }}
              />
            ))
          )}
        </SongsSection>
        <SongsSection heading="Trending Songs">
          {trendingSong.length === 0 ? (
            <MoreSkeletonCard count={10} />
          ) : (
            trendingSong.map((item, index) => (
              <SongCards
                key={index}
                songs={item}
                updateState={(id: string) => {
                  setTrendingSong((prev) =>
                    prev.map((x) =>
                      x.id === id ? { ...x, isLiked: !x.isLiked } : x
                    )
                  );
                }}
              />
            ))
          )}
        </SongsSection>
      </div>
    </div>
  );
}
