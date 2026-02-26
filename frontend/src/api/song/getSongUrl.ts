import api from "../baseUrlAxios";



export async function getSongUrl(encrypted_media_url: string): Promise<string> {
    const response = await api.post("/song/play", {
        encrypted_media_url
    })

    return response.data.song_url;
}