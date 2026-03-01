import { apiError } from "../utils/apiError.js";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";



export const errorHandler: ErrorRequestHandler = (err: apiError, req: Request, res: Response, next: NextFunction) => {
    if (err.statusCode === 500) {
        console.log(err.message);

        console.log(err.details)
    }
    res.status(err.statusCode).json(err.details)


}