import createRoom from "../controllers/createRoom";
import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import { getRooms } from "../controllers/getRooms";




const roomRouter = Router();

roomRouter.post("/create", verifyToken, createRoom);
roomRouter.get("/get_rooms", verifyToken, getRooms);

export default roomRouter;
