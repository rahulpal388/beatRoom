

export type ISong = {
    id: string,
    name: string,
    type: string,
    duration: number,
    language: string,
    album: {
        id: string,
        name: string,
        url: string
    },
    artists: {
        primary: {
            id: string,
            name: string,
            image: {
                quality: string,
                url: string
            }[],
            url: string,
            type: string
        }[]
    },
    image: {
        quality: string,
        url: string
    }[]
}

