const nodemailer = require('nodemailer');
import config from '../config/configSetup'
import { templateData } from '../config/template';



const transporter = nodemailer.createTransport({
    service: config.EMAIL_SERVICE,
    port: config.EMAIL_PORT,
    secure: true,
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

export async function sendEmail(to: string, subject: string, body: string, username: string | null) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: '',
        html: templateData(body, username || 'User')
    };

    try {
        const info = await transporter.sendMail(mailOptions);

        return {
            success: true,
            message: 'Email sent successfully',
            messageId: info.messageId,
        };
    } catch (error) {

        return {
            success: false,
            message: 'Failed to send email',
            error: error
        }
    }
}

module.exports = {
    sendEmail
}