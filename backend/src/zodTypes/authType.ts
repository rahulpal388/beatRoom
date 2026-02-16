import { email, z } from "zod"

export const signUpType = z.object({
    username: z.string().min(3, "Min 3 ").max(10, "max 4"),
    email: z.email("Invalid email"),
    password: z.string().min(6).max(10)
        .regex(/^(?=.*[a-z])/, "Must include at least one lowercase letter")
        .regex(/^(?=.*[A-Z])/, "Must include at least one uppercase letter")
        .regex(/^(?=.*\d)/, "Must include at least one number")
        .regex(/^(?=.*[^A-Za-z\d])/, "Must include at least one special character")
})


export const signinType = z.object({
    email: z.email("Invalid email"),
    password: z.string()
})

export const verifyOtpType = z.object({
    username: z.string(),
    password: z.string(),
    email: z.email("Invalid email"),
    otp: z.string().length(6)
})
