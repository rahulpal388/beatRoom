

import axios from "axios";
import { scrapPlaylist } from "../srcaping/playlist";
import { Router } from "express";
import { allPlaylist } from "../config/playlist";


import { playlistType } from "../zodTypes/playlist";
import getTrendingSong from "../controllers/song/getTending";
import httpAgentAndTimeOut from "../utils/httpAgent";
import getAlbumSong from "../controllers/song/getAlbumSong";
import getSong from "../controllers/song/getSong";





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
    song: string,
    image: string,
    album_url: string,
    type: string,
    singers: string,
    language: string
}

export type TSong = {
    duration: string,
    type: string,
    media_url: string,
}

const useSong = Router();


useSong.get("/play/:id", async (req, res) => {
    const id = req.params.id;
    console.log("url " + id)
    try {
        const response = await axios.get(`http://127.0.0.1:5100/result/?query=${id}`);

        const songs = response.data[0] as TSong;

        console.log(songs);

        const result = {
            duration: songs.duration,
            type: "song",
            downloadUrl: songs.media_url,

        }
        console.log(result);

        res.status(200).json(result);

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

        const response = await axios.get(`http://127.0.0.1:5100/song/?query=${encodeURIComponent(query as string)}`);



        const suggestion = response.data as TSearchSuggestion[];




        const suggestionResult = suggestion.map(x => {
            return {
                id: x.id,
                title: x.song,
                image: { quality: "320px", url: x.image },
                album: x.album_url,
                artist: x.singers,
                type: x.type,
                language: x.language
            }
        })
        console.log(suggestionResult);
        res.status(200).json({
            results: suggestionResult
        })

    } catch (error) {
        res.status(500).json({
            message: "server error"
        })

    }



})

// get the more info about the song
useSong.get("/:id", getSong)

// to get the trending song based on the language
useSong.get("/trending/:language/:page/:limit", getTrendingSong)

// get the list of album song based on the token ( token is the last album url id )
useSong.get("/albums/:id", getAlbumSong)

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
