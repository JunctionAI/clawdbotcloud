export default function Features() {
  const features = [
    {
      icon: '🎯',
      title: 'Auto-Detection',
      description: 'Automatically tracks every LinkedIn message you send. No manual entry required.',
    },
    {
      icon: '🔔',
      title: 'Smart Reminders',
      description: 'Get notifications to follow up at 3, 7, and 14 days. Never miss a warm lead.',
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'See your conversion rate, pending follow-ups, and full message history.',
    },
    {
      icon: '✅',
      title: 'Response Detection',
      description: 'Automatically marks leads as "responded" when they reply to your message.',
    },
    {
      icon: '🏷️',
      title: 'Lead Tagging',
      description: 'Organize leads by status (pending/responded/dead) and temperature (cold/warm/hot).',
    },
    {
      icon: '📥',
      title: 'CSV Export',
      description: 'Export your data anytime. Import into your CRM or analyze in Excel.',
    },
  ]
  
  return (
    <section className="py-20 px-6 bg-white" id="features">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to <span className="gradient-text">Close More Deals</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built specifically for sales reps, recruiters, and anyone serious about LinkedIn outreach.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Use Case Section */}
        <div className="mt-20 grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-bold mb-6">Perfect For:</h3>
            <ul className="space-y-4">
              {[
                'Sales Development Reps (SDRs)',
                'Account Executives (AEs)',
                'Recruiters & Talent Acquisition',
                'Business Development Managers',
                'Job Seekers Networking',
                'Growth Hackers & Partnership Leads',
              ].map((role, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700 font-medium">{role}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">The Problem We Solve</h3>
            <p className="text-gray-700 mb-6">
              You send 50-200 LinkedIn messages per week. Who did you message last Tuesday? 
              Who's been waiting 10 days for a follow-up? Who responded but you forgot to reply?
            </p>
            <p className="text-gray-700 font-semibold">
              Stop losing deals because you lost track. Let LinkedIn Tracker do the heavy lifting.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
