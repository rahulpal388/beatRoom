
import { Resend } from "resend";

export const sendEmail = async (
  subject: string,
  email: string,
  text: string,
  html: string
): Promise<boolean> => {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error("RESEND_API_KEY is missing");
    }

    const resendMailProvider = new Resend(apiKey);

    const { error } = await resendMailProvider.emails.send({
      to: email,
      from: "no-reply@beatroom.space",
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
};

