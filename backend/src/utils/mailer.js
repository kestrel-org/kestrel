import nodemailer from 'nodemailer';

async function sendMail(from, to, subject, message) {

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        tls: {rejectUnauthorized: false}
    });

    return transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: message
    });
}

export default sendMail;