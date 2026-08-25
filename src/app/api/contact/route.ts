import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getDb, ensureSchema, generateId, nowIso } from '@/lib/turso';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'info@kuwexstudios.co.zw';
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, service, message } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'First name, last name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const fullName = `${firstName} ${lastName}`;
    const timestamp = nowIso();

    // Save to Turso leads table
    try {
      await ensureSchema();
      const db = getDb();
      await db.execute({
        sql: `INSERT INTO leads (id, name, email, phone, company, service, status, value, source, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          generateId(),
          fullName,
          email,
          '',
          company || '',
          service || '',
          'new',
          0,
          'website_contact_form',
          message || '',
          timestamp,
          timestamp,
        ],
      });
    } catch (dbError) {
      console.error('Failed to save lead to database:', dbError);
      // Continue — email is more important than DB save
    }

    // Send email via Resend
    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #00E5FF, #0085FF); padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #000; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            <p style="color: #000; margin: 5px 0 0; opacity: 0.8;">KuWeX Studios Website</p>
          </div>
          <div style="background: #16181C; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #2F3336;">
            <table style="width: 100%; color: #fff; font-size: 16px;">
              <tr>
                <td style="padding: 8px 0; color: #71767B; width: 140px;">Name:</td>
                <td style="padding: 8px 0; font-weight: bold;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #71767B;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #00E5FF;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #71767B;">Company:</td>
                <td style="padding: 8px 0;">${company || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #71767B;">Service:</td>
                <td style="padding: 8px 0;">${service || 'Not specified'}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #2F3336; margin: 20px 0;" />
            <p style="color: #71767B; margin: 0 0 8px;">Message:</p>
            <div style="background: #000; padding: 16px; border-radius: 8px; border: 1px solid #2F3336; color: #fff; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            <hr style="border: none; border-top: 1px solid #2F3336; margin: 20px 0;" />
            <p style="color: #71767B; font-size: 13px; margin: 0;">
              This submission was received from the KuWeX Studios website contact form.<br/>
              Submitted on: ${new Date(timestamp).toLocaleString('en-ZW', { timeZone: 'Africa/Harare' })}
            </p>
          </div>
        </div>
      `;

      const { error: sendError } = await resend.emails.send({
        from: FROM_EMAIL,
        to: CONTACT_EMAIL,
        subject: `New Contact Form Submission from ${fullName}`,
        html,
        replyTo: email,
      });

      if (sendError) {
        console.error('Resend email error:', sendError);
        return NextResponse.json(
          { error: 'Failed to send email. Please try again or contact us directly.' },
          { status: 500 }
        );
      }
    } else {
      console.warn('RESEND_API_KEY is not set — contact form submission saved to DB only.');
    }

    return NextResponse.json(
      { success: true, message: 'Thank you for your message. We will get back to you within 24 hours.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
