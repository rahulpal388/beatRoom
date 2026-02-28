

import { Resend } from "resend";

const resendMailProvider = new Resend(process.env.RESEND_API_KEY);


export const sendEmail = async (subject: string, email: string, text: string, html: string): Promise<boolean> => {
    try {

        const msg = {
            to: email,
            from: "no-reply@rahulxtech.site",
            subject: subject,
            text,
            html
        }

        await resendMailProvider.emails.send(msg);


        return true;
    } catch (error) {
        console.log(JSON.stringify(error));
        return false;

    }

}
