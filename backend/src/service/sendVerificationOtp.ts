import { hashString } from "@utils/hashString.js";
import { generateOtp } from "./genetateOtp.js";
import { optModel } from "db/schema/otp.js";
import { sendOtp } from "./email/sendOtp.js";



export async function sendVerificationOtp(email: string, username: string): Promise<boolean> {
    const otp = generateOtp();
    console.log(otp);
    const hashOtp = hashString(otp);

    await optModel.findOneAndUpdate(
        { email },
        { $set: { otp: hashOtp } },
        { upsert: true }
    )

    return await sendOtp(otp, username, email);
}