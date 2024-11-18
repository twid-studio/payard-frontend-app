import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.AUTH_PASS,
  },
});

export default async function sendMail(data) {
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: data.receiverEmail,
    subject: `New form message`,
    text: `${`Contact form: ${data.emailOrPhone}`}\n\n${data.topic ? `Topic: ${data.topic}` : "No topic"}\n\n${data.message ? `Message: \n${data.message}` : "No message"}`,
  };

  await transporter.sendMail(mailOptions);
}
