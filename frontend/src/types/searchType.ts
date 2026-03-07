


export type ISearchSong = {
    id: string;
    title: string;
    image: string;
    album: string;
    url: string;
    type: string;
    description: string;
    more_info: {
        primary_artists: string;
        language: string;
    };
};

export type ISearchPlaylist = {
    id: string;
    title: string;
    image: string;
    url: string;
    language: string;
    type: string;
}

export type ISearchAlbum = {
    id: string;
    title: string;
    image: string;
    url: string;
    type: string;
    description: string;
    more_info: {
        language: string;
        song_pids: string;
    }
}

export type ISearchArtist = {
    id: string;
    title: string;
    image: string;
    url: string;
    type: string
}

export type ISearchReco = {
    albums: {
        data: ISearchAlbum[];
    },
    songs: {
        data: ISearchSong[];
    },
    playlists: {
        data: ISearchPlaylist[]
    },
    artists: {
        data: ISearchArtist[]
    }
    topquery: {
        data: ISearchAlbum[] | ISearchSong[] | ISearchArtist[] | ISearchPlaylist[];
    };
};