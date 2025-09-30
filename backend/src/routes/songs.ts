

import axios from "axios";
import { Router } from "express";
import { date } from "zod";
import { id } from "zod/v4/locales/index.cjs";


interface TSearchResult {
    "id": string,
    "title": string,
    "image": [
        {
            "quality": string,
            "url": string
        },
        {
            "quality": string,
            "url": string
        },
        {
            "quality": string,
            "url": string
        }
    ],
    "album": string,
    "url": string,
    "type": string,
    "description": string,
    "primaryArtists": string,
    "singers": string,
    "language": string
}


type TSong = {
    id: string,
    name: string,
    album: {
        id: string,
        name: string
    },
    artists: {
        primary: {
            name: string
        }[]

    },
    images: {
        quality: "50x50" | "150x150"
        url: string
    }[]
    ,
    downloadUrl: {
        quality: "160kbps"
    }[]

}

type TAlbum = {
    id: string,
    name: string,
    artists: {
        primary: {
            name: string
        }[],
        all: {
            name: string
        }[]
    },
    image: {
        quality: string,
        url: string
    }[]
}

type TPlaylist = {
    id: string,
    name: string,
    image: {
        quality: string,
        url: string
    }[],
}

const useSong = Router();


useSong.get("/search", async (req, res) => {

    const query = req.query
    const song = query.song;
    const playlistName = "trending now india";
    const album = query.album


    try {


        // id , name, album, image[50,150] , songUrl,
        // inside suggestions => [id, name,artist,images[50,150]]

        const songs = await axios.get(`https://full-jio-saavn-data-api-with-streams-download-etc1.p.rapidapi.com/search/songs?query=${song}`, {
            headers: {
                "X-RapidAPI-Key": process.env.RAPIDAPIKEY,
                "X-RapidAPI-Host": process.env.RAPIDAPIHOST
            }
        })
        const songAlbum = await axios.get(`https://full-jio-saavn-data-api-with-streams-download-etc1.p.rapidapi.com/search/albums?query=${album}`, {
            headers: {
                "X-RapidAPI-Key": process.env.RAPIDAPIKEY,
                "X-RapidAPI-Host": process.env.RAPIDAPIHOST
            }
        })
        const playlist = await axios.get(`https://full-jio-saavn-data-api-with-streams-download-etc1.p.rapidapi.com/search?query=${playlistName}`, {
            headers: {
                "X-RapidAPI-Key": process.env.RAPIDAPIKEY,
                "X-RapidAPI-Host": process.env.RAPIDAPIHOST
            }
        })


        // songs
        const songData = songs.data.data.results[0];
        const songResult = {
            id: songData.id,
            name: songData.name,
            releasedDate: songData.releasedDate,
            duration: songData.duration,
            language: songData.language,
            image: [
                songData.image[0],
                songData.image[1]
            ],
            url: songData.downloadUrl[3]
        }

        // song album
        const albumData = songAlbum.data.data.results as TAlbum[];
        const albumResult: TAlbum[] = albumData.map(x => {
            return {
                id: x.id,
                name: x.name,
                artists: {
                    primary: x.artists.primary.map(x => ({ name: x.name })),
                    all: x.artists.all.map(x => ({ name: x.name }))
                },
                image: [x.image[0], x.image[1]]
            }

        })

        // playlist

        // const playlistData = playlist.data.data.results as TPlaylist[]
        // const playlistResult = playlistData.map(x => {
        //     return {
        //         id: x.id,
        //         name: x.name,
        //         image: [x.image[0], x.image[1]]
        //     }
        // })


        res.status(200).json({
            // songResult,
            // albumResult,
            // playlisResult


            message: playlist.data
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: " server error  "
        })
    }



})

useSong.get("/suggestions", async (req, res) => {

    const search = req.query.search;
    const options = {
        method: "GET",
        // url: "https://full-jio-saavn-data-api-with-streams-download-etc1.p.rapidapi.com/search/songs",
        url: `https://jiosaavn-api-unofficial.p.rapidapi.com/search?query=${search}&type=song&limit=10`,
        // params: { query: "Dhun" }, // query params
        headers: {
            "X-RapidAPI-Key": process.env.RAPIDAPIKEY,
            "X-RapidAPI-Host": process.env.RAPIDAPIHOST
        }
    };


    axios.request(options)
        .then(response => {
            const results: TSearchResult[] = response.data.data.songs.results
            const data: {
                id: string,
                title: string,
                image: string,
                artists: string,
                album: string
            }[] = [];

            console.log(response.data.data.songs.results)

            results.forEach(element => {
                data.push({
                    id: element.id,
                    title: element.title,
                    image: element.image[0].url,
                    artists: element.singers,
                    album: element.album
                })
            });

            res.json({
                results: data
            })
        })
        .catch(err => console.error(err));




})


export default useSong;