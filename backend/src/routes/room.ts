import createRoom from "../controllers/createRoom";
import { Router } from "express";
import verifyToken from "../middleware/verifyToken";




const roomRouter = Router();

roomRouter.post("/create", verifyToken, createRoom);
roomRouter.post("/join", verifyToken);

export default roomRouter;
