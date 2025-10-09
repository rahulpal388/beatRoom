export type ITrendingSong = {
    id: string,
    title: string,
    type: string,
    image: string,
    language: string,
    more_info: {
        album_id: string,
        album: string,
        duration: string,
        artistMap: {
            primary_artists: {
                id: string,
                name: string,
                type: string
            }[]
        }
    }
}