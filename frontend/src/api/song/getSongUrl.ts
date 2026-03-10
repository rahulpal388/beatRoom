import api from "../baseUrlAxios";



export async function getSongUrl(encrypted_media_url: string): Promise<{
    success: true;
    url: string;
} | {
    success: false;
    messsage: string
}> {

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