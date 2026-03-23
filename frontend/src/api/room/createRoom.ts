import clientAPI from "../baseUrlAxios";





export async function createRoom(data: {
    roomName: string;
    userId: string
}): Promise<boolean> {

    try {
        clientAPI.post("/room/create", data);
        return true;
    } catch {
        return false;
    }

}