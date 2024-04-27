import nodemailer from "nodemailer";

const mailHelper = async (option) => {
  // Create a transporter using SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Email content
  const message = {
    from: 'raj.kurane03@gmail.com',
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  try {
    // Send email using the promise-based version of sendMail
    const info = await transporter.sendMail(message);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error:', error);
  }
};

export { mailHelper };






