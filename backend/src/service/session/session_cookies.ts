import { env } from "@zodTypes/envType.js"
import { CookieOptions, Response } from "express"

const refCookieOptions: CookieOptions = {
    secure: env.NODE_ENV !== "development",
    httpOnly: true,
    sameSite: env.NODE_ENV === "development" ? "lax" : "strict",
    maxAge: 1000 * 60 * 60 * 24 * 15
}

const acCookieOptions: CookieOptions = {
    secure: env.NODE_ENV !== "development",
    httpOnly: true,
    sameSite: env.NODE_ENV === "development" ? "lax" : "strict",
    maxAge: 1000 * 15
}

export function setRefCookie(res: Response, token: string) {
    res.cookie("ref", token, refCookieOptions)
}


export function setAcsCookie(res: Response, token: string) {
    res.cookie("ac", token, acCookieOptions)
}


export function clearRefCookie(res: Response) {
    res.clearCookie("ref", refCookieOptions)
}

export function clearAcCookie(res: Response) {
    res.clearCookie("ac", acCookieOptions)
}

