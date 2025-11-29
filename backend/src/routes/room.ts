import createRoom from "../controllers/createRoom.js";
import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import { getRooms } from "../controllers/getRooms.js";




const roomRouter = Router();

// later add verification

roomRouter.post("/create", createRoom);
roomRouter.get("/get_rooms", getRooms);

export default roomRouter;
