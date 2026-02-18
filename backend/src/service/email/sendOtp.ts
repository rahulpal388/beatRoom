import { sendEmail } from "./sendEmail.js";



export async function sendOtp(otp: string, username: string, email: string): Promise<boolean> {


    const text = `Your OTP code is ${otp}. It expires in 2 minutes.`
        ;

    const html = `
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:20px; font-family:Arial, sans-serif;">
          <tr>
            <td align="center">
              <table width="400" cellpadding="0" cellspacing="0" style="background-color:#ffffff; padding:30px; border-radius:8px;">
                <tr>
                  <td align="center">
                    <h2 style="margin:0;">Your OTP Code</h2>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:20px 0;">
                    <div style="font-size:32px; font-weight:bold; letter-spacing:6px; color:#333;">
                      ${otp}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-size:14px; color:#777;">
                    This code will expire in 2 minutes.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        `;

    return await sendEmail(email, text, html);


}