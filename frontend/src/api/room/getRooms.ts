import { RoomListType } from "@/types/roomTypes";
import clientAPI from "../baseUrlAxios";





export async function getRooms(): Promise<RoomListType[]> {

    try {
        const response = await clientAPI.get("/room");
        return response.data as RoomListType[]
    } catch (error) {
        return []
    }
}