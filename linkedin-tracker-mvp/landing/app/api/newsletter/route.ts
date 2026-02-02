import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }
    
    // TODO: Integrate with email service (Mailchimp, ConvertKit, etc.)
    // For MVP, just log the email
    console.log('Newsletter signup:', email)
    
    // In production, you'd do something like:
    /*
    const response = await fetch('https://api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
      }),
    })
    */
    
    // For MVP, simulate success
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
