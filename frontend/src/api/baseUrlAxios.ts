import axios from "axios";


const api = axios.create({
    baseURL: "https://api.rahulxtech.site/api/v1",
    withCredentials: true
})

export default api;