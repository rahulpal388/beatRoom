import createRoom from "../controllers/createRoom";
import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import { getRooms } from "../controllers/getRooms";




const roomRouter = Router();

// later add verification

roomRouter.post("/create", createRoom);
roomRouter.get("/get_rooms", getRooms);

export default roomRouter;
