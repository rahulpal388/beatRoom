import { email, z } from "zod"

export const signinType = z.object({
    username: z.string().min(3).max(8),
    email: z.email(),
    password: z.string().min(6).max(10)
})


export const verifyOtpType = z.object({
    otp: z.string().length(6)
})
