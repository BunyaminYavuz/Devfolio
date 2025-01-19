const nodemailer = require('nodemailer');

const sendResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your own email provider
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  const resetUrl = `http://yourdomain.com/reset-password/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    text: `Please click the link below to reset your password:\n\n${resetUrl}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendResetEmail; 