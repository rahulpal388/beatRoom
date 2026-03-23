import { apiError } from "../utils/apiError.js";
import { ErrorRequestHandler, Request, Response } from "express";



export const errorHandler: ErrorRequestHandler = (err: apiError, req: Request, res: Response) => {
    console.log("AN error happend")
    if (err.statusCode === 500) {
        console.log(err.message);
        console.log(err.details)
    }
    res.status(err.statusCode).json(err.details)


}