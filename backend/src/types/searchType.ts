


export type ApiSearchSong = {
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

export type ApiSearchPlaylist = {
    id: string;
    title: string;
    image: string;
    url: string;
    language: string;
    type: string;
}

export type ApiSearchAlbum = {
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

export type ApiSearchArtist = {
    id: string;
    title: string;
    image: string;
    url: string;
    type: string
}

export type ApiSearchReco = {
    albums: {
        data: ApiSearchAlbum[];
    },
    songs: {
        data: ApiSearchSong[];
    },
    playlists: {
        data: ApiSearchPlaylist[]
    },
    artists: {
        data: ApiSearchArtist[]
    }
    topquery: {
        data: ApiSearchAlbum[] | ApiSearchSong[] | ApiSearchArtist[] | ApiSearchPlaylist[];
    };
};