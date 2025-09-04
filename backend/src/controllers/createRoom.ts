import { createRoomId } from "../utils/createRoomId";
import { Request, Response } from "express";


const createRoom = (req: Request, res: Response) => {


    const roomId = createRoomId();


    //task 1 : store the room id in the DB of the user is exist


    res.status(200).json({
        roomId,
        message: `your room id is ${roomId}`
    })


}




export default createRoom;
