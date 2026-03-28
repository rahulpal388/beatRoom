import { RoomListType } from "@/types/roomTypes";
import clientAPI from "../baseUrlAxios";
import { AxiosInstance } from "axios";





export async function getRooms(axios: AxiosInstance): Promise<RoomListType[]> {

    try {
        const response = await axios.get("/room");
        return response.data as RoomListType[]
    } catch (error) {
        return []
    }
}