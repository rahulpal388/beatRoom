"use client";
import { SongCards } from "@/components/dashboard/music/songCard";
import { useAlbumStore } from "@/store/albumStore";
import { usePlaylistStore } from "@/store/playlistStore";
import { useSongStore } from "@/store/songStore";
import { IArtistInfo, IArtistInfoOnly } from "@/types/artistType";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SongCardContaier } from "./music/songCardContainer";
import { Container } from "../container";
import { ShowDetailPlay } from "./showDetailPlay";
import { Heart } from "lucide-react";
import { removeEntity } from "@/api/removeEntity";
import { saveArtist } from "@/api/artist/saveArtist";
import { Arima } from "next/font/google";
import { useToastNotification } from "@/context/toastNotificationContext";
import { Button } from "@/ui/button";
import { getSong } from "@/lib/getSong";
import { useQueueStore } from "@/store/queueStore";

type Active = "song" | "album" | "playlist" | "new_release";
type ArtistOptions = {
  title: string;
  active: Active;
};

const artistItems: ArtistOptions[] = [
  {
    title: "Song",
    active: "song",
  },
  {
    title: "Album",
    active: "album",
  },
  {
    title: "Playlist",
    active: "playlist",
  },
  {
    title: "New Release",
    active: "new_release",
  },
];

export default function ArtistComponent({
  artistInfo,
  token,
}: {
  artistInfo: IArtistInfo;
  token: string;
}) {
  const [active, setActive] = useState<Active>("song");
  const [artist, setArtist] = useState<IArtistInfoOnly | null>(null);
  const addSongs = useSongStore((s) => s.actions.addSongs);
  const addAlbum = useAlbumStore((s) => s.actions.addAlbum);
  const { toastMessage } = useToastNotification();
  const addQueueSongAndSetCurrent = useQueueStore(
    (s) => s.actions.addQueueSongAndSetCurrent,
  );
  const { addDedicatedArtistPlaylist, addFeaturedArtistPlaylist } =
    usePlaylistStore((s) => s.actions);
  useEffect(() => {
    addSongs(artistInfo.topSongs);
    addAlbum(
      artistInfo.topAlbums.map((x) => ({
        id: x.id,
        title: x.title,
        subtitle: x.subtitle,
        language: x.language,
        list_count: x.list_count,
        type: x.type,
        perma_url: x.perma_url,
        image: x.image,
        isLiked: x.isLiked,
      })),
    );
    addAlbum(
      artistInfo.latest_release.map((x) => ({
        id: x.id,
        title: x.title,
        subtitle: x.subtitle,
        language: x.language,
        list_count: x.list_count,
        type: x.type,
        perma_url: x.perma_url,
        image: x.image,
        isLiked: x.isLiked,
      })),
    );
    addDedicatedArtistPlaylist(artistInfo.dedicated_artist_playlist);
    addFeaturedArtistPlaylist(artistInfo.featured_artist_playlist);
    setArtist({
      artistId: artistInfo.artistId,
      name: artistInfo.name,
      subtitle: artistInfo.subtitle,
      image: artistInfo.image,
      follower_count: artistInfo.follower_count,
      type: artistInfo.type,
      isLiked: artistInfo.isLiked,
    });
  }, []);

  if (!artist) {
    return null;
  }

  return (
    <>
      <Container className=" px-2 ">
        <div className=" flex max-sm:flex-col sm:gap-8 gap-2 items-center  px-20 py-8 w-full ">
          <div>
            <Image
              src={artist.image}
              alt="artist"
              height={100}
              width={100}
              className="md:h-[14rem] md:w-[15rem] sm:h-[10rem] sm:w-[10rem]   h-[10rem]  w-[10rem] rounded-full"
            />
          </div>
          <div className="  flex flex-col gap-2  max-sm:items-center ">
            <h1 className=" md:text-5xl text-3xl  font-semibold ">
              {artist.name}
            </h1>
            <p className=" max-sm:text-xs ">
              {artist.type[0].toUpperCase() + artist.type.slice(1)} &#8226;
              {" " + Number(artist.follower_count).toLocaleString()} Followers
            </p>

            <div className="sm:mt-4 mt-2 flex  items-center md:gap-12 gap-8 ">
              <Button
                type="button"
                btnType="Primary"
                name="Play"
                className="  h-12 w-20 max-md:h-[2.5rem] max-md:w-[4rem] "
                onClick={async () => {
                  const songArr = await getSong(artistInfo.topSongs[0]);
                  addQueueSongAndSetCurrent(songArr);
                }}
              />
              <div className=" hover:bg-card-hover border-[0.5px] border-card-border/30 hover:border-primary  rounded-full p-2 cursor-pointer ">
                <Heart
                  size={30}
                  className={`cursor-pointer    ${
                    artist.isLiked
                      ? "fill-red-800 stroke-0 block "
                      : " stroke-[1.2px] "
                  } `}
                  onClick={async () => {
                    const { success, message } = artist.isLiked
                      ? await removeEntity(artist.artistId, artist.type)
                      : await saveArtist({
                          id: artist.artistId,
                          name: artist.name,
                          type: artist.type,
                          role: "",
                          image: artist.image,
                          perma_url: `/${token}`,
                          isLiked: artist.isLiked,
                        });

                    if (success) {
                      setArtist((prev) => {
                        if (!prev) {
                          return null;
                        }
                        return { ...prev, isLiked: !prev?.isLiked };
                      });
                    }
                    toastMessage({
                      message,
                      type: success ? "success" : "error",
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <ul className=" flex sm:gap-12 gap-8 max-xs:gap-4 px-4  border-b-[1px] border-primary/30 ">
              {artistItems.map((x, idx) => (
                <li
                  key={idx}
                  className={`sm:text-lg  font-light h-8  cursor-pointer pb-2 ${
                    active === x.active
                      ? "border-b-2 border-primary "
                      : "hover:border-b-2 hover:border-primary "
                  }  `}
                  onClick={() => {
                    setActive(x.active);
                  }}
                >
                  {x.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className=" mt-4 ">
          {active === "song" && (
            <SongCardContaier>
              {artistInfo.topSongs.map((song, idx) => (
                <SongCards
                  key={idx}
                  id={song.id}
                  type={song.type}
                  className=" w-full   "
                />
              ))}
            </SongCardContaier>
          )}
          {active === "album" && (
            <SongCardContaier>
              {artistInfo.topAlbums.map((song, idx) => (
                <SongCards
                  key={idx}
                  id={song.id}
                  type={song.type}
                  className=" w-full   "
                />
              ))}
            </SongCardContaier>
          )}
          <div>
            {active === "playlist" && (
              <div>
                <div>
                  <h1 className=" text-2xl px-4  border-b-[1px] border-primary/30 ">
                    Featured In
                  </h1>
                  <SongCardContaier>
                    {artistInfo.featured_artist_playlist.map((song, idx) => (
                      <SongCards
                        key={idx}
                        id={song.id}
                        type={song.type}
                        className="w-full"
                      />
                    ))}
                  </SongCardContaier>
                </div>
                <div className=" mt-4 ">
                  <h1 className=" text-2xl px-4 border-b-[1px] border-primary/30 ">
                    Just {artistInfo.name}
                  </h1>
                  <div className="  mt-8  ">
                    <SongCardContaier>
                      {artistInfo.dedicated_artist_playlist.map((song, idx) => (
                        <SongCards
                          key={idx}
                          id={song.id}
                          type={song.type}
                          className="w-full"
                        />
                      ))}
                    </SongCardContaier>
                  </div>
                </div>
              </div>
            )}
          </div>
          {active === "new_release" && (
            <div className="px-2 ">
              <h1 className=" text-2xl  ">New Released</h1>
              <div className="  mt-8   ">
                <SongCardContaier>
                  {artistInfo.latest_release.map((song, idx) => (
                    <SongCards
                      key={idx}
                      id={song.id}
                      type={song.type}
                      className=" w-full   "
                    />
                  ))}
                </SongCardContaier>
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
