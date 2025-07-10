import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  requireTLS: process.env.SMTP_PORT !== '465',
  family: 4, // Force IPv4 to avoid connection issues
});

// Handle GET requests to /api/contact (health check)
export async function GET() {
  return NextResponse.json({ status: "Working" });
}

// Handle POST requests to /api/contact
export async function POST(request) {
  try {
    // Get form data from request
    const body = await request.json();
    const { name, email, phone, subject, message } = body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Send email
    const mailOptions = {
      from: process.env.SMTP_USER, // Use the authenticated email
      replyTo: email, // Set reply-to as the form submitter's email
      to: process.env.RECIPIENT || 'goldenhill.ajay@gmail.com',
      subject: `Contact Form: ${subject}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
             <p><strong>Subject:</strong> ${subject}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    };

    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Error sending email' },
      { status: 500 }
    );
  }
}
