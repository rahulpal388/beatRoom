import { ISearchReco } from "@/types/searchType";
import api from "./baseUrlAxios";




export async function searchReco(query: string): Promise<ISearchReco> {

    return (await api.get(`/song/search?query=${query}`)).data

}