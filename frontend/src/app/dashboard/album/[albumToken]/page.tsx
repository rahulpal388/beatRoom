"use client";
import { ArtistCard } from "@/components/dashboard/music/artistCard";
import { ShowSongDetails } from "@/components/dashboard/music/showSongDetail";
import { SongCards, SongsSection } from "@/components/dashboard/music/songCard";
import { SongHorizontalCard } from "@/components/dashboard/music/songHorizontalCard";
import { BASE_URL } from "@/lib/baseUrl";
import { IAlbum, ISongAlbum } from "@/types/albumType";
import { MoreArtistCardSkeleton } from "@/ui/artistCardSkeleton";
import { MoreSkeletonCard } from "@/ui/cardSkeleton";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AlbumPage() {
  const token = useParams().albumToken;
  const [album, setAlbum] = useState<ISongAlbum | null>(null);
  const [recoAlbum, setRecoAlbum] = useState<IAlbum[]>([]);
  const [trendingAlbum, setTrendingAlbum] = useState<IAlbum[]>([]);

  useEffect(() => {
    const fetchAlbum = async () => {
      const responseAlbum = await axios.get(
        `${BASE_URL}/album/?albumToken=${token}`,
        { withCredentials: true }
      );
      setAlbum(responseAlbum.data);
      console.log(responseAlbum.data);
      const [responseReco, responseTrendingAlbum] = await Promise.all([
        await axios.get(`${BASE_URL}/album/reco/${responseAlbum.data.id}`, {
          withCredentials: true,
        }),
        axios.get(
          `${BASE_URL}/album/trendingAlbum/?page=0&limit=10&language=hindi`,
          { withCredentials: true }
        ),
      ]);

      setRecoAlbum(responseReco.data);
      setTrendingAlbum(responseTrendingAlbum.data);
    };

    fetchAlbum();
  }, []);

  return (
    <div className=" pb-18 px-4 ">
      <div>
        {album && (
          <ShowSongDetails
            image={album.image}
            title={album.title}
            songId={album.id}
            album_url={album.perma_url}
            song_url=""
            subtitle={album.subtitle}
            language={album.language}
            type={album.type}
            duration={`${album.list
              .map((x) => Number(x.more_info.duration))
              .reduce((total, num) => total + num, 0)}`}
          />
        )}
      </div>
      <div className="mt-8 md:px-12  ">
        <h1 className="text-xl font-semibold line-clamp-1 max-w-[30rem]  ">
          Songs From {album?.title}
        </h1>
        <div className="mt-4 flex flex-col gap-2 ">
          {album?.list.map((items, index) => (
            <SongHorizontalCard
              key={index}
              serialNumber={index + 1}
              songs={items}
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
      </div>

      <div className="flex flex-col gap-4 mt-8 ">
        <SongsSection heading="You Might Like">
          {recoAlbum.length === 0 ? (
            <MoreSkeletonCard count={10} />
          ) : (
            recoAlbum.map((items, index) => (
              <SongCards
                key={index}
                songs={items}
                updateState={(id: string) => {
                  setRecoAlbum((prev) =>
                    prev.map((x) =>
                      x.id === id ? { ...x, isLiked: !x.isLiked } : x
                    )
                  );
                }}
              />
            ))
          )}
        </SongsSection>
        <SongsSection heading="Trending Album">
          {trendingAlbum.length === 0 ? (
            <MoreSkeletonCard count={10} />
          ) : (
            trendingAlbum.map((items, index) => (
              <SongCards
                key={index}
                songs={items}
                updateState={(id: string) => {
                  setTrendingAlbum((prev) =>
                    prev.map((x) =>
                      x.id === id ? { ...x, isLiked: !x.isLiked } : x
                    )
                  );
                }}
              />
            ))
          )}
        </SongsSection>

        <SongsSection heading="Artists">
          <div className=" grid grid-cols-2 w-full gap-8 ">
            {!album ? (
              <MoreArtistCardSkeleton count={6} />
            ) : (
              album.more_info.artistMap.primary_artists.map((artist, index) => (
                <ArtistCard
                  key={index}
                  name={artist.name}
                  url={artist.perma_url}
                  type={artist.type}
                  image={artist.image}
                />
              ))
            )}
          </div>
        </SongsSection>
      </div>
    </div>
  );
}
