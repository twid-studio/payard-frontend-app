import sendMail from "@/lib/helpers/sendMail";

export default async function handler(req, res) {
    if(req.method == "POST") {
        const { emailOrPhone, topic, message } = req.body

        try {
            await sendMail({ emailOrPhone, topic, message })

            res.status(200).json({
                success: true
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "INternal server error"
            })
        }
    }
}