import { Request, Response } from "express";


const createRoom = (req: Request, res: Response) => {

    // create a random room id (stirng)

    const roomId = "dsdsf3249823udsa"


    // store the room id in the DB of the user is exist


    res.status(200).json({
        roomId,
        message: `your room id is ${roomId}`
    })


}




export default createRoom;
