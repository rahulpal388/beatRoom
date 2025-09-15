

import axios from "axios";
import { Router } from "express";


const useSong = Router();

useSong.get("/", async (req, res) => {

    const song = req.query.song;


    const options = {
        method: "GET",
        url: "https://full-jio-saavn-data-api-with-streams-download-etc1.p.rapidapi.com/search/songs",
        params: { query: "believer" }, // query params
        headers: {
            "X-RapidAPI-Key": "813d745bb5mshd1a19b62315c348p10a452jsnae41392b32c6",
            "X-RapidAPI-Host": "full-jio-saavn-data-api-with-streams-download-etc1.p.rapidapi.com"
        }
    };

    axios.request(options)
        .then(response => {
            console.log(response.data)
            res.json(response.data)
        })
        .catch(err => console.error(err));




})


export default useSong;