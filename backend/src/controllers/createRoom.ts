import { CreateRoomType } from "../zodTypes/createRoomType";
import { createRoomId } from "../utils/createRoomId";
import { Request, Response } from "express";
import { roomDB } from "../index";


const createRoom = (req: Request, res: Response) => {

    const { success, data } = CreateRoomType.safeParse(req.body);
    if (!success) {
        res.status(401).json({
            message: "Invalid input provide username and room name"
        })
        return;
    }

    const roomId = createRoomId();

    //task 1 : store the room id in the DB of the user is exist
    roomDB.push({
        username: data.username,
        roomname: data.roomname,
        roomId: roomId
    })

    res.status(200).json({
        roomId,
        message: `your room id is ${roomId}`
    })


}




export default createRoom;
