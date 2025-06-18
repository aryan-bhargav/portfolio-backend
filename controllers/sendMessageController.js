const nodemailer = require('nodemailer');
require("dotenv").config();

const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Message from portfolio by ${name} user`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📨 Message sent by ${email}`);
    res.status(200).send("Message sent");
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    res.status(500).send("Failed to send message");
  }
};

module.exports = { sendMessage };
