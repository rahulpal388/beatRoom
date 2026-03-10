"use client";
import { LikedAlbum } from "@/components/dashboard/music/likedAlbum";
import { LikedArtist } from "@/components/dashboard/music/likedArtist";
import { LikedPlaylist } from "@/components/dashboard/music/likedPlaylist";
import { LikedSong } from "@/components/dashboard/music/likedSong";
import { useAuth } from "@/context/authContext";
import { useAlbumStore } from "@/store/albumStore";
import { useLikedLibraryStore } from "@/store/likedLibraryStore";
import { usePlaylistStore } from "@/store/playlistStore";
import { useSongStore } from "@/store/songStore";
import { IAlbum } from "@/types/albumType";
import { IArtists } from "@/types/artistType";
import { IPlaylist } from "@/types/playlistType";
import { ISong } from "@/types/songType";
import { useEffect, useState } from "react";

type ActiveItems = "song" | "album" | "playlist" | "artist";

type ItemsType = {
  title: string;
  active: ActiveItems;
};

const items: ItemsType[] = [
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
    title: "Artist",
    active: "artist",
  },
];

export function LikePageComponent({
  song,
  albums,
  playlist,
}: {
  song: ISong[];
  albums: IAlbum[];
  playlist: IPlaylist[];
}) {
  const [active, setActive] = useState<ActiveItems>("song");
  const { isAuthenticated } = useAuth();

  const addSongs = useSongStore((s) => s.actions.addSongs);
  const addAlbum = useAlbumStore((s) => s.actions.addAlbum);
  const addPlaylist = usePlaylistStore((s) => s.actions.addPlaylist);
  const { addLikedAlbum, addLikedPlaylist, addLikedSong } =
    useLikedLibraryStore((s) => s.actions);

  useEffect(() => {
    addSongs(song);
    addAlbum(albums);
    addPlaylist(playlist);
    addLikedAlbum(albums, true);
    addLikedPlaylist(playlist, true);
    addLikedSong(song, true);
  }, []);

  return (
    <>
      <div className="  py-8 md:px-12 px-4">
        <h1 className=" text-4xl ">Liked Music</h1>
        <div>
          <ul className=" flex items-center gap-12   mt-8  border-b-[1px] border-primary/20 ">
            {items.map((x, idx) => (
              <li
                key={idx}
                className={`text-lg font-light h-8 pb-2 cursor-pointer ${
                  active === x.active
                    ? "border-b-2 border-primary "
                    : "hover:border-b-2 hover:border-primary "
                }  `}
                onClick={async () => {
                  setActive(x.active);
                }}
              >
                {x.title}
              </li>
            ))}
          </ul>
        </div>
        <div className=" lg:pb-24 pb-28  ">
          {isAuthenticated ? (
            <div>
              {active === "song" && <LikedSong />}
              {active === "playlist" && <LikedPlaylist />}
              {active === "album" && <LikedAlbum />}
              {active === "artist" && <LikedArtist />}
            </div>
          ) : (
            <div className=" flex items-center justify-around py-[4rem]  text-lg">
              Login to see liked {active} !
            </div>
          )}
        </div>
      </div>
    </>
  );
}
