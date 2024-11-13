import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user:"valeraviachalo@gmail.com",
        pass:"fwphugztfqehblkx"
    }
})

export default async function sendMail(data) {
    const mailOptions = {
        from:"valeraviachalo@gmail.com",
        to: "valeravyachalo@gmail.com",
        subject: `Topic: ${data.topic}`,
        text: `Text: ${data.emailOrPhone}\n${data.message}`
    }

    await transporter.sendMail(mailOptions)
}