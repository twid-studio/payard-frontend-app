import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user:process.env.EMAIL_SENDER,
        pass:process.env.AUTH_PASS
    }
})

export default async function sendMail(data) {
    const mailOptions = {
        from:process.env.EMAIL_SENDER,
        to: "valeravyachalo@gmail.com",
        subject: `Topic: ${data.topic}`,
        text: `Text: ${data.emailOrPhone}\n${data.message}`
    }

    await transporter.sendMail(mailOptions)
}