

import axios from "axios";
import { scrapPlaylist } from "../srcaping/playlist";
import { Router } from "express";
import { allPlaylist } from "../config/playlist";

import https from "https";

const agent = new https.Agent({ family: 4 }); // force IPv4



type ISearchSong = {
    "id": string,
    "name": string,
    "type": string,
    "artists": {
        "primary": {
            "name": string,

        }[],

    },
    "image":
    {
        "quality": string,
        "url": string
    }[],
    "downloadUrl":
    {
        "quality": string,
        "url": string
    }[]

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

useSong.get("/search", async (req, res) => {

    const { query } = req.query;

    try {

        const response = await axios.get(`https://saavn.dev/api/search?query=${encodeURIComponent(query as string)}`, { httpsAgent: agent, timeout: 10000 });
        console.log(response.data)
        // const result = response.data.data.results as ISearchSong[];
        // const songs: ISearchSong[] = result.map(x => {
        //     return {
        //         id: x.id,
        //         name: x.name,
        //         type: x.type,
        //         artists: {
        //             primary: x.artists.primary.map(item => {
        //                 return {
        //                     name: item.name
        //                 }
        //             })
        //         },
        //         image: [x.image[2]],
        //         downloadUrl: [x.downloadUrl[4]]
        //     }
        // })

        res.status(200).json({
            results: response.data.data
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error"
        })

    }



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
    const bhojpuriPlaylist = await scrapPlaylist(bhojpuri, 10)

    res.status(200).json({
        // indiePlaylist,
        // punjabiPlaylist,
        // romanticPlaylist,
        // bhojpuriPlaylist
        ...allPlaylist
    })


})


export default useSong;
