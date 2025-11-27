import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { json } from "zod";





export const nextError: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: err.message || "server error"
    })

}