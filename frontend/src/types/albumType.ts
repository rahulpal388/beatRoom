export type IAlbumSongs = {
    id: string,
    name: string,
    type: string,
    language: string,
    artists: {
        primary: {
            id: string,
            name: string,
            role: string,
            image: {
                quality: string,
                url: string
            }[]
            ,
            type: string,
            url: string
        }
    },
    image: {
        quality: string,
        url: string
    }[],
    songs: {
        id: string,
        name: string,
        type: string,
        duration: number,
        language: string,
        album: {
            id: string,
            name: string,
        },
        artists: {
            primary: {
                id: string,
                name: string,
                role: string,
                image: {
                    quality: string,
                    url: string
                }[]
                ,
                type: string,
                url: string
            }
        },
        image: {
            quality: string,
            url: string
        }[]
    }[]
}
