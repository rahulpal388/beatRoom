"use client";
import { ArtistCard } from "@/components/dashboard/music/artistCard";
import { ShowSongDetails } from "@/components/dashboard/music/showSongDetail";
import { SongCards, SongsSection } from "@/components/dashboard/music/songCard";
import { SongHorizontalCard } from "@/components/dashboard/music/songHorizontalCard";
import { BASE_URL } from "@/lib/baseUrl";
import { IAlbums, ISongAlbum } from "@/types/albumType";
import { MoreArtistCardSkeleton } from "@/ui/artistCardSkeleton";
import { MoreSkeletonCard } from "@/ui/cardSkeleton";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AlbumPage() {
  const token = useParams().albumToken;
  const [album, setAlbum] = useState<ISongAlbum | null>(null);
  const [recoAlbum, setRecoAlbum] = useState<IAlbums[]>([]);
  const [trendingAlbum, setTrendingAlbum] = useState<IAlbums[]>([]);

  useEffect(() => {
    const fetchAlbum = async () => {
      const responseAlbum = await axios.get(
        `${BASE_URL}/album/?albumToken=${token}`
      );
      setAlbum(responseAlbum.data);
      console.log(responseAlbum.data);
      const [responseReco, responseTrendingAlbum] = await Promise.all([
        await axios.get(`${BASE_URL}/album/reco/${responseAlbum.data.id}`),
        axios.get(
          `${BASE_URL}/album/trendingAlbum/?page=0&limit=10&language=hindi`
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
            subtitle={album.subtitle}
            language={album.language}
            type={album.type}
            duration={`${album.list
              .map((x) => Number(x.more_info.duration))
              .reduce((total, num) => total + num, 0)}`}
          />
        )}
      </div>
      <div className="mt-8 px-12  ">
        <h1 className="text-xl font-semibold  ">Songs From {album?.title}</h1>
        <div className="mt-4 flex flex-col gap-2 ">
          {album?.list.map((items, index) => (
            <SongHorizontalCard
              key={index}
              serialNumber={index + 1}
              id={items.id}
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
          {recoAlbum.length === 0 ? (
            <MoreSkeletonCard count={10} />
          ) : (
            recoAlbum.map((items, index) => (
              <SongCards
                key={index}
                id={items.id}
                type={items.type}
                title={items.title}
                artist=""
                image={items.image}
                song_url=""
                album_url={items.perma_url}
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
                type={items.type}
                id={items.id}
                title={items.title}
                artist=""
                image={items.image}
                song_url=""
                album_url={items.perma_url}
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
