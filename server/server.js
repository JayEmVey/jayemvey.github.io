const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['https://jayemvey.github.io', 'http://jayemvey.github.io'],
    methods: ['GET', 'POST', 'HEAD'],
    credentials: true
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: 'mail9046.maychuemail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'giang.ntt@gate7.vn',
    pass: '77zEUbk3Y2'
  }
});

// Subscribe endpoint
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Email content
    const mailOptions = {
      from: '"Gate 7 Coffee Roastery" <giang.ntt@gate7.vn>',
      to: email,
      subject: 'Gate 7 Coffee Roastery is Opening Mid-October 2025',
      text: `Dear Friend,

We are delighted to announce that Gate 7 Coffee Roastery will officially open in mid-October 2025. Our management team is dedicated to delivering the finest coffee experience, and we are excited to welcome you to our new space.

At Gate 7, every cup is crafted with precision, care, and a passion for excellence. We look forward to serving you soon and becoming your go-to destination for exceptional coffee.

Warm regards,
The Gate 7 Coffee Roastery Team`,
      html: `<p>Dear Friend,</p>

<p>We are delighted to announce that Gate 7 Coffee Roastery will officially open in mid-October 2025. Our management team is dedicated to delivering the finest coffee experience, and we are excited to welcome you to our new space.</p>

<p>At Gate 7, every cup is crafted with precision, care, and a passion for excellence. We look forward to serving you soon and becoming your go-to destination for exceptional coffee.</p>

<p>Warm regards,<br>
The Gate 7 Coffee Roastery Team</p>`
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ message: 'Thank you for subscribing! Check your email for confirmation.' });
  } catch (error) {
    console.error('Error:', error);
    let errorMessage = 'Error sending email. Please try again later.';
    
    if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Unable to connect to email server. Please try again later.';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Connection to email server timed out. Please try again later.';
    } else if (error.responseCode >= 500) {
      errorMessage = 'Email server error. Please try again later.';
    }

    res.status(500).json({ message: errorMessage });
  }
});

// Serve static files
app.use(express.static('../'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});