

import axios from "axios";
import { scrapPlaylist } from "../srcaping/playlist";
import { Router } from "express";
import { allPlaylist } from "../config/playlist";

import https from "https";

const agent = new https.Agent({ family: 4 }); // force IPv4

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


useSong.get("/", async (req, res) => {

    const { query } = req.query
    const songQuery = encodeURIComponent(query as string)
    try {
        const response = await axios.get(`https://saavn.dev/api/search/songs?query=${songQuery}`, { httpsAgent: agent, timeout: 10000 });

        const songs = response.data.data.results;

        const url = songs[0].downloadUrl[3]
        res.status(200).json({ ...url })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "error"
        })
    }

})

useSong.get("/suggestions", async (req, res) => {

    const search = req.query.search;
    const options = {
        method: "GET",
        // url: "https://full-jio-saavn-data-api-with-streams-download-etc1.p.rapidapi.com/search/songs",
        url: `https://jiosaavn-api-unofficial.p.rapidapi.com/playlists?id=1134768973`,
        // params: { query: "Dhun" }, // query params
        headers: {
            "X-RapidAPI-Key": process.env.RAPIDAPIKEY,
            "X-RapidAPI-Host": process.env.RAPIDAPIHOST
        }
    };


    axios.request(options)
        .then(response => {
            // const results: TSearchResult[] = response.data.data.songs.results
            // const data: {
            //     id: string,
            //     title: string,
            //     image: string,
            //     artists: string,
            //     album: string
            // }[] = [];

            // console.log(response.data.data.songs.results)

            // results.forEach(element => {
            //     data.push({
            //         id: element.id,
            //         title: element.title,
            //         image: element.image[0].url,
            //         artists: element.singers,
            //         album: element.album
            //     })
            // });

            console.log(response.data)

            res.json({
                results: response.data
            })
        })
        .catch(err => console.error(err));




})


useSong.post("/playlist", async (req, res) => {
    const url = req.body.url as string;

    const playlist = await scrapPlaylist(url, 10);
    console.log(playlist);
    res.status(200).json({
        playlist
    })

})

useSong.post("/playlist/all", async (req, res) => {

    const { indie, punjabi, romantic, bhojpuri } = req.body;
    // const indiePlaylist = await scrapPlaylist(indie, 10);
    // const punjabiPlaylist = await scrapPlaylist(punjabi, 10)
    // const romanticPlaylist = await scrapPlaylist(romantic, 10)
    // const bhojpuriPlaylist = await scrapPlaylist(bhojpuri, 10)

    res.status(200).json({
        // indiePlaylist,
        // punjabiPlaylist,
        // romanticPlaylist,
        // bhojpuriPlaylist
        ...allPlaylist
    })


})


export default useSong;
