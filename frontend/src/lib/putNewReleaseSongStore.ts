import { useAlbumStore } from "@/store/albumStore";
import { useSongStore } from "@/store/songStore";
import { IAlbum } from "@/types/albumType";
import { INewReleaseSong, ISong } from "@/types/songType";


export function putNewReleaseSongStore(newRelease: INewReleaseSong[]) {
    const addSongs = useSongStore.getState().actions.addSongs;
    const addAlbum = useAlbumStore.getState().actions.addAlbum;
    const newReleaseSong = newRelease.filter((x) => x.type === "song");
    const newReleaseAlbum = newRelease.filter((x) => x.type === "album");
    addSongs(newReleaseSong as ISong[]);
    const album = newReleaseAlbum.map((x) => ({
        id: x.id,
        title: x.title,
        subtitle: x.subtitle,
        language: x.language,
        list_count: "",
        type: x.type,
        perma_url: x.perma_url,
        image: x.image,
        isLiked: x.isLiked,
    }));
    addAlbum(album as IAlbum[]);
}