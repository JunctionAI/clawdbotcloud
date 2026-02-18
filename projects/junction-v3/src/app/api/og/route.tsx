import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

// Using node runtime for compatibility
// export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // Allow customization via query params
  const title = searchParams.get('title') || 'AI-Native Marketing';
  const subtitle = searchParams.get('subtitle') || 'Operations That Scale';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          padding: '80px 100px',
          position: 'relative',
        }}
      >
        {/* Background gradient orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
          }}
        />
        
        {/* Logo and brand */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          {/* Junction logo mark */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            style={{ marginRight: '24px' }}
          >
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <path d="M25 8 Q8 8 8 25" stroke="url(#logoGrad)" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M55 8 Q72 8 72 25" stroke="url(#logoGrad)" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M25 72 Q8 72 8 55" stroke="url(#logoGrad)" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M55 72 Q72 72 72 55" stroke="url(#logoGrad)" strokeWidth="8" strokeLinecap="round" fill="none" />
          </svg>
          <span style={{ fontSize: '48px', fontWeight: 800, color: '#0f172a' }}>
            Tom Hall-Taylor
          </span>
        </div>
        
        {/* Main title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontSize: '72px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.1,
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: '72px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.1,
            }}
          >
            {subtitle}
          </span>
        </div>
        
        {/* Tagline */}
        <div
          style={{
            marginTop: '40px',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: '28px',
              color: '#64748b',
              fontWeight: 500,
            }}
          >
            AI-Native Marketing · By Application Only
          </span>
        </div>
        
        {/* Website */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '100px',
            fontSize: '24px',
            color: '#94a3b8',
          }}
        >
          junctionmedia.ai
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
