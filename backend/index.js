require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for all origins
app.use(cors());
// Preflight support
app.options('*', cors());

app.use(express.json());

// Configure Nodemailer transporter
const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  requireTLS: smtpPort === 587,
  // force use of IPv4 to avoid IPv6/localhost issues
  family: 4,
});

// Test connection
transporter.verify().then(() => {
  console.log('SMTP server is ready to take our messages');
}).catch(console.error);

// Health check endpoint
app.get('/contact', (req, res) => {
  res.send('Working');
});

// Contact route
app.post('/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const mailOptions = {
    from: email,
    to: process.env.RECIPIENT,
    subject: `Contact Form: ${subject}`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Phone:</strong> ${phone}</p>
           <p><strong>Subject:</strong> ${subject}</p>
           <p><strong>Message:</strong><br/>${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ success: false, error: 'Error sending email' });
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
