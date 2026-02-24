


export function getItemsToken(url: string, songUrl: string): {
    token: string;
    AlbumToken: string
} {

    const AlbumToken = songUrl.split("/").at(-1) || "";
    const token = url.split("/").at(-1) || ""

    return { token, AlbumToken }

}