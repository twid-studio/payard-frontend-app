import accountDeletionMail from "@/lib/helpers/accountDeletionMail";
import getRecieverMail from "@/lib/helpers/getRecieverMail";

export default async function handler(req, res) {
    if(req.method === "POST") {
        const { emailOrPhone, message } = req.body

        try {
            const receiverEmail = await getRecieverMail();
            
            await accountDeletionMail({ 
                emailOrPhone, 
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