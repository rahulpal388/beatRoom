import api from "../baseUrlAxios";




export async function getSongBySameArtist(artistId: string) {
    return (await api.get(`/song/getTopSongByArtist/${artistId}`)).data;

}