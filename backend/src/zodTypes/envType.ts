import { z } from "zod"


export const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    // CROSS_ORIGIN_URL:
    DATABASE_URL: z.string().min(1, "database url is required"),
    PORT: z.number().default(8080),
    OTP_SECRET: z.string().min(1, "OTP_SECRET is required"),
    Ac_SECRET: z.string().min(1, "Ac_SECRET is require"),
    Ref_SECRET: z.string().min(1, "Ref_SECRET is require"),
    UINQUE_USERID_SECRET: z.string().min(1, "UINQUE_USERID_SECRET is required"),
    EMAIL: z.string().min(1, "EMAIL is required"),
    EMAIL_PASS: z.string().min(1, "EMAIL_PASS is required")


})


export function envValidate() {
    console.log("checking env validation")
    const { data, success, error } = envSchema.safeParse(process.env)
    if (!success) {
        console.log(error.message);
        process.exit(1);
    }

    return data;
}

export const env = envValidate();
