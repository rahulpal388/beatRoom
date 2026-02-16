import { env } from "@zodTypes/envType.js"
import { Response } from "express"


export function setRefCookie(res: Response, token: string) {
    res.cookie("ref", token, {
        secure: env.NODE_ENV !== "development",
        httpOnly: true,
        sameSite: env.NODE_ENV === "development" ? "none" : "strict",
        maxAge: 1000 * 60 * 60 * 24 * 15
    })
}


export function setAcsCookie(res: Response, token: string) {
    res.cookie("ref", token, {
        secure: env.NODE_ENV !== "development",
        httpOnly: true,
        sameSite: env.NODE_ENV === "development" ? "none" : "strict",
        maxAge: 1000 * 15
    })
}


