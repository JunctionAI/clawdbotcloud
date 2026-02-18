import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    // Graceful fallback - log and return success so form doesn't break
    console.log('[Apply Form] RESEND_API_KEY not set. Form data received:', data);
    return NextResponse.json({ success: true, method: 'logged' });
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(RESEND_API_KEY);

    const emailBody = `
New Partnership Application from Junction Media Website

Name: ${data.name}
Business: ${data.business}
Website: ${data.website || 'Not provided'}
Revenue: ${data.revenue}
Primary Need: ${data.need}
Referred By: ${data.referral || 'Not provided'}

---
Submitted via junctionmedia.ai/apply
    `.trim();

    await resend.emails.send({
      from: 'Junction Media <noreply@junctionmedia.ai>',
      to: 'tom@junctionmedia.ai',
      subject: `New Application: ${data.business || data.name}`,
      text: emailBody,
    });

    return NextResponse.json({ success: true, method: 'resend' });
  } catch (error) {
    console.error('[Apply Form] Resend error:', error);
    return NextResponse.json({ success: false, error: 'Email failed' }, { status: 500 });
  }
}
