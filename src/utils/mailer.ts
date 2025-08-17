import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendCredentialsEmail = async (email: string, password: string) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Your BHT Corporation Client Portal Account Credentials',
    html: `
      <h1>Welcome to BHT Corporation!</h1>
      <p>An account has been created for you on our client portal.</p>
      <p>You can now log in to send us commands and track your projects directly.</p>
      <br>
      <p><strong>Your Login Credentials:</strong></p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <br>
      <p>Please keep these credentials safe. We recommend you change your password upon first login (feature coming soon).</p>
      <p>Sincerely,</p>
      <p>The BHT Corporation Team</p>
    `,
  };
  await transporter.sendMail(mailOptions);
};