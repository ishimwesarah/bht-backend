import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendContactEmail = async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'bhtcorpor@gmail.com',
      replyTo: email,
      subject: `New Contact Form Message: ${subject}`,
      html: `<h2>Message from ${name} (${email})</h2><p>${message}</p>`,
    });
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email' });
  }
};