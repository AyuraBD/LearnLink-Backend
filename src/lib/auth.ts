import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer"

// If your Prisma file is located elsewhere, you can change the path

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    trustedOrigins: [process.env.APP_URL!],
    user:{
        additionalFields:{
            role: {
                type: "string",
                required: true,
                validate: (value:string) => ["STUDENT", "TUTOR"].includes(value) || "Invalid"
            },
            phone:{
                type: "string",
                required: false,
            }
        }
    },
    emailAndPassword: { 
        enabled: true, 
        autoSignIn: false,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({user, url, token})=>{
            try{
                // console.log("User:", user, "URL:", url, "Token", token);
                const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`
                const info = await transporter.sendMail({
                from: '"LearnLink" <LearnLink@gmail.com>',
                to: user.email,
                subject: "Email Verification",
                url: url,
                html: `<!DOCTYPE html>
                            <html lang="en">
                            <head>
                            <meta charset="UTF-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <title>Verify your email</title>
                            <style>
                                body {
                                background:#f5f7fb;
                                font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
                                margin:0;
                                padding:0;
                                }
                                .container {
                                max-width:540px;
                                margin:32px auto;
                                background:#ffffff;
                                border-radius:14px;
                                box-shadow:0 20px 40px rgba(0,0,0,.05);
                                padding:32px;
                                }
                                .logo {
                                font-size:20px;
                                font-weight:700;
                                color:#2563eb;
                                margin-bottom:20px;
                                }
                                .title {
                                font-size:22px;
                                font-weight:700;
                                margin-bottom:12px;
                                color:#111827;
                                }
                                .text {
                                color:#4b5563;
                                line-height:1.6;
                                margin-bottom:20px;
                                }
                                .btn {
                                display:inline-block;
                                background:#2563eb;
                                color:white !important;
                                padding:12px 22px;
                                border-radius:10px;
                                text-decoration:none;
                                font-weight:600;
                                }
                                .footer {
                                margin-top:28px;
                                font-size:13px;
                                color:#6b7280;
                                }
                                a { color:#2563eb; }
                            </style>
                            </head>
                            <body>
                            <div class="container">
                                <div class="logo">Learn Link</div>

                                <div class="title">Verify your email</div>

                                <p class="text">
                                Hey — welcome ${user.name} Tap the button below to confirm your email and finish setting up your account.
                                </p>

                                <p style="text-align:center; margin:28px 0;">
                                <a href="${verificationUrl}" class="btn">Verify Email</a>
                                </p>

                                <p class="text">
                                If the button doesn’t work, paste this link into your browser:<br />
                                <a href="${verificationUrl}">${verificationUrl}</a>
                                </p>

                                <div class="footer">
                                If you didn’t request this, you can ignore it. This link expires soon for security reasons.
                                <br /><br />
                                — Learn Link team
                                </div>
                            </div>
                            </body>
                            </html>`, // HTML version of the message
                        });
                        // console.log("Verification Info", info)
            }catch(err:any){
                // console.error(err.message);
                throw new Error(err.message);
            }
        }
    }
});