import { INewReleaseSong, ISong } from "@/types/songType";
import { getPlaylistSong } from "@/api/playlist/getPlaylistSong";
import { getAlbumSong } from "@/api/album/getAlbumSong";
import { IPlaylist } from "@/types/playlistType";
import { IAlbum } from "@/types/albumType";
import { IArtistAlbum, IArtistInfo } from "@/types/artistType";
import { getUserSavedPlaylistInfo } from "@/api/playlist/getUserSavedPlaylist";


export const getSong = async (songs: ISong | IPlaylist | IAlbum | IArtistAlbum | INewReleaseSong | IArtistInfo
): Promise<ISong[]> => {

  switch (songs.type) {
    case "song": {
      const token = songs.more_info.album_url.split("/").at(-1) || "";
      const albumSongs = await getAlbumSong(token);
      if (!albumSongs) {
        return [songs] as ISong[];
      } else {
        return [songs as ISong, ...albumSongs.list.filter(x => x.id !== songs.id)];
      }

    }
    case "playlist": {
      const token = songs.perma_url.split("/").at(-1) || "";
      const playlistSong = await getPlaylistSong(token);
      if (!playlistSong) {
        return [];
      }

      return playlistSong.list
    }
    case "userPlaylist": {
      const userPlaylistSong = await getUserSavedPlaylistInfo(songs.id);
      return userPlaylistSong.list;
    }

    case "album": {
      const token = songs.perma_url.split("/").at(-1) || "";

      const albumSong = await getAlbumSong(token);
      if (!albumSong) {
        return [];
      }
      return albumSong.list;

    }

    case "artist": {

      return await getSong(songs.topSongs[0])
    }

  }



  return [];
};
