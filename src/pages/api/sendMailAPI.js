import getRecieverMail from "@/lib/helpers/getRecieverMail";
import sendMail from "@/lib/helpers/sendMail";

export default async function handler(req, res) {
    if(req.method === "POST") {
        const { emailOrPhone, topic, message } = req.body

        try {
            const receiverEmail = await getRecieverMail();
            
            await sendMail({ 
                emailOrPhone, 
                topic, 
                message, 
                receiverEmail 
            });

            res.status(200).json({
                success: true
            });
        } catch (error) {
            console.error('Email sending error:', error);
            return res.status(500).json({
                success: false,
                error: "Internal server error"
            });
        }
    }
}