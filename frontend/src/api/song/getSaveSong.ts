import { ISong } from "@/types/songType";
import api from "../baseUrlAxios";
import axios from "axios";


export async function getSaveSong(): Promise<ISong[]> {

    try {
        return (await api.get("/song/save")).data

    } catch (error) {
        return []
    }




}