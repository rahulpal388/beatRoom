import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken"

const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(" ")[1];

    console.log(`authorization token ${token}`);

    // check if the token exist or not

    if (!token) {

        res.status(411).json({
            message: "No authorization token"
        })

        return;

    }

    // verify the token
    const verifyToken = Jwt.verify(token, process.env.JWT_SECRET!);

    // if token verified call the next function
    if (verifyToken) {


        next();

    }

    res.status(411).json({
        message: "Invalid token"
    })

    return;



}



export default verifyToken;