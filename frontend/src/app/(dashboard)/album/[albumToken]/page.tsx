"use client";
import { getAlbumReco } from "@/api/album/getAlbumReco";
import { getAlbumSong } from "@/api/album/getAlbumSong";
import { getTrendingAlbum } from "@/api/album/getTrendingAlbum";
import { ArtistCard } from "@/components/dashboard/music/artistCard";
import { ShowSongDetails } from "@/components/dashboard/music/showSongDetail";
import { SongCards, SongsSection } from "@/components/dashboard/music/songCard";
import { SongHorizontalCard } from "@/components/dashboard/music/songHorizontalCard";
import { IAlbum, IAlbumSong } from "@/types/albumType";
import { MoreArtistCardSkeleton } from "@/ui/artistCardSkeleton";
import { MoreSkeletonCard } from "@/ui/cardSkeleton";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AlbumPage() {
  const token = useParams().albumToken;
  const [album, setAlbum] = useState<IAlbumSong | null>(null);
  const [recoAlbum, setRecoAlbum] = useState<IAlbum[]>([]);
  const [trendingAlbum, setTrendingAlbum] = useState<IAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      const responseAlbum = await getAlbumSong(token as string);
      setAlbum(responseAlbum);
      if (!responseAlbum) {
        notFound();
      }
      const [responseReco, responseTrendingAlbum] = await Promise.all([
        await getAlbumReco(responseAlbum.id),
        getTrendingAlbum(10, 1, responseAlbum.language),
      ]);

      setRecoAlbum(responseReco);
      setTrendingAlbum(responseTrendingAlbum);
      setIsLoading(false);
    };

    fetchAlbum();
  }, [token]);

  return (
    <div className=" pb-18 md:px-4 ">
      <div>
        {album && (
          <ShowSongDetails items={album} />
        )}
      </div>
      {
        isLoading || album && (
          <div className="mt-8 md:px-12  ">
            <h1 className="text-xl font-semibold line-clamp-1 max-w-[30rem]  ">
              Songs From {album?.title}
            </h1>
            <div className="mt-4 flex flex-col gap-2 ">
              {album.list.map((items, index) => (
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
        )
      }

      <div className="flex flex-col gap-4 mt-8 ">
        <SongsSection heading="You Might Like">
          {isLoading ? (
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
          {isLoading ? (
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
          <div className="mt-2 pb-12 w-full gap-4 grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
            {isLoading || !album ? (
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
