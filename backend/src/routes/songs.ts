

import axios from "axios";
import { Router } from "express";
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


const useSong = Router();

useSong.get("/suggestions", async (req, res) => {

    const search = req.query.search;

    console.log(search)
    const options = {
        method: "GET",
        // url: "https://full-jio-saavn-data-api-with-streams-download-etc1.p.rapidapi.com/search/songs",
        url: `https://jiosaavn-api-unofficial.p.rapidapi.com/search?query=${search}&type=song&limit=5`,
        // params: { query: "Dhun" }, // query params
        headers: {
            "X-RapidAPI-Key": "813d745bb5mshd1a19b62315c348p10a452jsnae41392b32c6",
            "X-RapidAPI-Host": "full-jio-saavn-data-api-with-streams-download-etc1.p.rapidapi.com"
        }
    };

    axios.request(options)
        .then(response => {
            const results: TSearchResult[] = response.data.data.songs.results
            const data: {
                id: string,
                title: string,
                image: string,
                artists: string
            }[] = [];

            results.forEach(element => {
                data.push({
                    id: element.id,
                    title: element.title,
                    image: element.image[0].url,
                    artists: element.singers
                })
            });

            res.json({
                results: data
            })
        })
        .catch(err => console.error(err));




})


export default useSong;