
import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  CROSS_ORIGIN_URL: z.string().optional(),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  PORT: z.coerce.number().default(8080),
  WSS_PORT: z.coerce.number().default(8082),
  OTP_SECRET: z.string().min(1, "OTP_SECRET is required"),
  Ac_SECRET: z.string().min(1, "Ac_SECRET is required"),
  Ref_SECRET: z.string().min(1, "Ref_SECRET is required"),
  UINQUE_USERID_SECRET: z
    .string()
    .min(1, "UINQUE_USERID_SECRET is required"),
  UINQUE_ROOM_SECRET: z
    .string()
    .min(1, "UINQUE_ROOM_SECRET is required"),
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
});

export type AppEnv = z.infer<typeof envSchema>;

export function envValidate(source: Record<string, unknown> = process.env) {
  const result = envSchema.safeParse(source);

  if (!result.success) {
    throw new Error(
      `Environment validation failed:\n${result.error.message}`
    );
  }

  return result.data;
}

export const env = envValidate();

