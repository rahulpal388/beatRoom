

import axios from "axios";
import { scrapPlaylist } from "../srcaping/playlist";
import { Router } from "express";
import { allPlaylist } from "../config/playlist";

import https from "https";
import { playlistType } from "../zodTypes/playlist";

const agent = new https.Agent({ family: 4 }); // force IPv4



type TPlaylistSongs = {
    id: string,
    title: string,
    type: string,
    image: string,
    more_info: {
        duration: string,
        artistMap: {
            primary_artists: { name: string }[]
        }
    }
}

type TSearchSuggestion = {
    id: string,
    title: string,
    image: { quality: string, url: string }[],
    album: string,
    type: string,
    singers: string
}

export type TSong = {
    id: string,
    name: string,
    type: string,
    duration: string
    artists: {
        primary: { name: string }[]
    },
    image: {
        quality: string,
        url: string
    }[],
    downloadUrl: {
        quality: string,
        url: string
    }[],
}

const useSong = Router();


useSong.get("/play/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(`https://saavn.dev/api/songs/${id}`, { httpsAgent: agent, timeout: 10000 });

        const songs = response.data.data as TSong[];

        const result = songs.map(x => {
            return {
                id: x.id,
                title: x.name,
                artist: x.artists.primary.map(({ name }) => name).join(", "),
                type: x.type,
                duration: x.duration,
                image: x.image[2],
                downloadUrl: x.downloadUrl[4],
            }
        })


        res.status(200).json(...result)

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



        const suggestion = response.data.data.songs.results as TSearchSuggestion[];

        const suggestionResult = suggestion.map(x => {
            return {
                id: x.id,
                title: x.title,
                image: x.image[2],
                album: x.album,
                artist: x.singers,
                type: x.type
            }
        })

        res.status(200).json({
            results: suggestionResult
        })

    } catch (error) {
        res.status(500).json({
            message: "server error"
        })

    }



})


useSong.get("/playlist/:id", async (req, res) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit)
    const id = req.params.id

    const { success, data } = playlistType.safeParse({ page, limit, id })

    if (!success) {
        return res.status(200).json({
            message: "invalid url"
        })
    }

    try {
        const response = await axios.get(`https://www.jiosaavn.com/api.php?__call=playlist.getDetails&listid=${data.id}&api_version=4&_format=json&_marker=0`);

        const songLists = response.data.list as TPlaylistSongs[];

        const list = songLists.splice(page * limit, (page + 1) * limit);
        const result = list.map(x => {
            return {
                id: x.id,
                title: x.title,
                type: x.type,
                image: x.image,
                duration: x.more_info.duration,
                artist: x.more_info.artistMap.primary_artists.map(({ name }) => name).join(", ")
            }
        })

        res.json({ songs: result })


    } catch (error) {
        res.status(200).json({
            songs: []
        })
    }

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
