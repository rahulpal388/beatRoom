import api from "../baseUrlAxios";

export type SongUrlResponseType = {
    success: true;
    url: string;
} | {
    success: false;
    messsage: string
}

export async function getSongUrl(encrypted_media_url: string): Promise<SongUrlResponseType> {

    try {

        const response = await api.post("/song/play", {
            encrypted_media_url
        })
        return {
            success: true,
            url: response.data.song_url
        }

    } catch {
        return {
            success: false,
            messsage: "Can't Play Song"
        }
    }
}