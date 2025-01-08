import { Resend } from "resend";
import {ErrorResponse} from "../ErrorResponse/errorResponse";


const resend = new Resend(process.env.resend_api_key);


export const resendEmail  = async (userEmail: string, otp: number) => {

    const textBody = htmlBody(otp);

    const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [userEmail],
        subject: "Verify your account",
        html: textBody,
    });

    if (error) {
        return new ErrorResponse(error.message, "400", "Bad Request")
    }

    return data;
}

function htmlBody (otp:number) {
  return  `<div style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #007bff;">Account Verification</h2>
    <p>Dear User,</p>
    <p>Thank you for registering with us. To complete your account verification, please use the following One-Time Password (OTP):</p>
    <h3 style="color: #28a745;">Your OTP: <strong> ${otp}</strong></h3>
    <p>The OTP is valid for the next 10 minutes. Please do not share it with anyone.</p>
    <p>If you did not request this verification, please ignore this email.</p>
    <p>Best regards,<br>Your Company Name</p>
  </div>`
}