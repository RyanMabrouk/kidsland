"use server";
import { createTransport } from "nodemailer";
require("dotenv").config();
let transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    type: "OAUTH2",
    user: process.env.GMAIL_USERNAME,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: process.env.OAUTH_ACCESS_TOKEN,
    expires: 3599,
  },
});
type EmailResponse = {
  Error: unknown;
  Status: string;
  message: string;
};
export async function sendMail(
  toWho: string,
  subject: string,
  content: any,
): Promise<EmailResponse> {
  try {
    const mailOptions = {
      from: "softyhr@gmail.com",
      to: toWho,
      subject: subject,
      html: content,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        throw new Error(err.message);
      }
    });
    return {
      Error: null,
      Status: "failed",
      message: "Error sending message",
    };
  } catch (error) {
    return {
      Error: error,
      Status: "failed",
      message: "Something Went Wrong",
    };
  }
}
