import { ISearchReco } from "@/types/searchType";
import clientAPi from "./baseUrlAxios";




export async function searchReco(query: string): Promise<ISearchReco> {

    return (await clientAPi.get(`/song/search?query=${query}`)).data

}