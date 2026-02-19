import { env } from "../zodTypes/envType.js";
import { TOTP } from "totp-generator";


export function generateOtp(): string {

    return TOTP.generate(env.OTP_SECRET).otp;

}