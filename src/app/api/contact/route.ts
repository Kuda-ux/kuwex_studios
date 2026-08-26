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

    // Basic validation — lastName is optional (some forms only collect a single name)
    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
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

    const fullName = lastName ? `${firstName} ${lastName}` : firstName;
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

      // Send auto-responder confirmation to the submitter
      const serviceLabels: Record<string, string> = {
        'branding': 'Digital Branding & Creative Design',
        'web-dev': 'Web & Mobile App Development',
        'multimedia': 'Multimedia Production',
        'marketing': 'Digital Marketing',
        'consultancy': 'Innovation Research & Consultancy',
      };
      const serviceLabel = serviceLabels[service] || 'your project';

      const autoResponderHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #00E5FF, #0085FF); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #000; margin: 0; font-size: 28px;">Thank You, ${firstName}!</h1>
            <p style="color: #000; margin: 8px 0 0; font-size: 16px; opacity: 0.85;">We've received your message</p>
          </div>
          <div style="background: #16181C; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #2F3336;">
            <p style="color: #fff; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
              Hi ${firstName},
            </p>
            <p style="color: #71767B; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">
              Thank you for reaching out to KuWeX Studios. We've received your enquiry about <strong style="color: #00E5FF;">${serviceLabel}</strong> and our team is already reviewing your message.
            </p>
            <div style="background: #000; padding: 20px; border-radius: 8px; border: 1px solid #2F3336; margin: 20px 0;">
              <p style="color: #71767B; margin: 0 0 8px; font-size: 13px;">Your message:</p>
              <p style="color: #fff; margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="color: #71767B; font-size: 15px; line-height: 1.6; margin: 20px 0;">
              <strong style="color: #fff;">What happens next?</strong>
            </p>
            <ul style="color: #71767B; font-size: 15px; line-height: 1.8; padding-left: 20px; margin: 0 0 20px;">
              <li>We'll review your project details within the next few hours</li>
              <li>You'll receive a personalised response within 24 hours</li>
              <li>Need to talk sooner? Call or WhatsApp us at <strong style="color: #00E5FF;">+263 719 066 891</strong></li>
            </ul>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/263719066891" style="background: #25D366; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 30px; font-weight: bold; display: inline-block; font-size: 15px;">Chat on WhatsApp</a>
            </div>
            <hr style="border: none; border-top: 1px solid #2F3336; margin: 20px 0;" />
            <p style="color: #71767B; font-size: 13px; margin: 0; line-height: 1.6;">
              KuWeX Studios — Zimbabwe's #1 Digital Marketing Agency<br/>
              <a href="https://kuwexstudios.co.zw" style="color: #00E5FF; text-decoration: none;">kuwexstudios.co.zw</a> · info@kuwexstudios.co.zw · +263 719 066 891
            </p>
          </div>
        </div>
      `;

      const { error: autoResponderError } = await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `We've received your message, ${firstName}!`,
        html: autoResponderHtml,
      });

      if (autoResponderError) {
        console.error('Auto-responder email error:', autoResponderError);
        // Don't fail the request — the notification email was sent successfully
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
