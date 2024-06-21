import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import { EMAIL_USER, EMAIL_PASS } from '../config/env';
import path from 'path';

const transporter: Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

// Function to load an email template from file
const loadTemplate = (templateName: string, replacements: any): string => {
    const templatePath = path.join(__dirname, `../templates/${templateName}.handlebars`);
    const templateHtml = fs.readFileSync(templatePath, { encoding: 'utf-8' });
    const template = handlebars.compile(templateHtml);
    return template(replacements);
};

// Function to send an email
export const sendEmail = async (to: string, subject: string, templateName: string, replacements: any, attachments: any[] = []): Promise<string> => {
    try {
        const mailOptions = {
            from: EMAIL_USER,
            to,
            subject,
            html: loadTemplate(templateName, replacements),
            attachments,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return 'Email sent successfully';
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};
