export default function Success() {
  return (
    <div className="min-h-screen gradient-bg text-white flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to LinkedIn Tracker Pro!
        </h1>
        <p className="text-xl text-white/90 mb-8">
          Your 7-day free trial has started. No charges until {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}.
        </p>
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Next Steps:</h2>
          <ol className="text-left space-y-3 text-white/90">
            <li className="flex gap-3">
              <span className="font-bold">1.</span>
              <span>Install the Chrome extension (if you haven't already)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">2.</span>
              <span>Go to LinkedIn and start messaging prospects</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">3.</span>
              <span>Watch your dashboard fill with tracked leads</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">4.</span>
              <span>Get follow-up reminders and never lose a deal again</span>
            </li>
          </ol>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="https://chrome.google.com/webstore"
            className="btn-primary"
          >
            🚀 Install Extension
          </a>
          <a 
            href="/"
            className="btn-secondary"
          >
            ← Back to Home
          </a>
        </div>
        
        <p className="mt-8 text-white/70 text-sm">
          Questions? Email <a href="mailto:support@linkedintracker.app" className="underline">support@linkedintracker.app</a>
        </p>
      </div>
    </div>
  )
}
