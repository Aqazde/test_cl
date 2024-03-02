import crypto from "crypto";
import nodemailer from "nodemailer";
import "dotenv/config";
async function sendVerificationEmail(user, verificationToken, req) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'adil64489@gmail.com',
            pass: 'fuph yqca sytz vkym',
        },
    });

    const mailOptions = {
        from: 'adil64489@gmail.com',
        to: user.email,
        subject: "Verify Your Email",
        html: `<h4>Hello, ${user.first_name}</h4>
           <p>Please verify your email by clicking on the link below:</p>
           <a href="http://${req.headers.host}/verify-email?token=${verificationToken}">Verify Email</a>`,
    };
    await transporter.sendMail(mailOptions);
}

function generateVerificationToken(size = 32) {
    return crypto.randomBytes(size).toString("hex");
}

export { sendVerificationEmail, generateVerificationToken };