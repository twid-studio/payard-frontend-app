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

export default async function accountDeletionMail(data) {
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: data.receiverEmail,
    subject: `New delete account deletion request`,
    text: `${`Contact form: ${data.emailOrPhone}`}\n\n${data.message ? `Reason: \n${data.message}` : "No reason"}`,
  };

  await transporter.sendMail(mailOptions);
}
