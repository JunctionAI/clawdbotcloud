export default function BusinessCategories() {
  return (
    <section className="relative" id="model">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-16">
            <h2 className="text-3xl font-bold text-white md:text-4xl" data-aos="zoom-y-out">
              The Junction Model
            </h2>
            <p className="mt-4 text-lg text-gray-400" data-aos="zoom-y-out" data-aos-delay={150}>
              AI Power + Human Wisdom
            </p>
            <p className="mt-4 text-gray-500" data-aos="zoom-y-out" data-aos-delay={200}>
              We've built something different. Not AI replacing humans. Not humans ignoring AI. 
              A true synthesis that delivers results neither could achieve alone.
            </p>
          </div>
          
          {/* Three pillars */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Pillar 1 */}
            <div 
              className="relative rounded-2xl bg-gray-900/50 border border-gray-800 p-6 md:p-8 hover:border-blue-500/50 transition-all duration-300 group"
              data-aos="zoom-y-out"
              data-aos-delay={100}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Autonomous Agents</h3>
                <p className="text-gray-400">
                  Multi-agent systems that work in parallel—spawning sub-agents, handling complexity, 
                  and continually improving. While you sleep, the system evolves.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div 
              className="relative rounded-2xl bg-gray-900/50 border border-gray-800 p-6 md:p-8 hover:border-blue-500/50 transition-all duration-300 group"
              data-aos="zoom-y-out"
              data-aos-delay={200}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Strategic Creativity</h3>
                <p className="text-gray-400">
                  Expert human minds directing the AI orchestra. We apply creative strategy and business 
                  expertise to push these tools toward maximum impact.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div 
              className="relative rounded-2xl bg-gray-900/50 border border-gray-800 p-6 md:p-8 hover:border-blue-500/50 transition-all duration-300 group"
              data-aos="zoom-y-out"
              data-aos-delay={300}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Your AI Infrastructure</h3>
                <p className="text-gray-400">
                  We don't just work for you—we empower you. Get your own personal AI assistants, 
                  custom agents, and the latest tools integrated into your operation.
                </p>
              </div>
            </div>
          </div>

          {/* The Problem Section */}
          <div className="mt-20">
            <div className="mx-auto max-w-3xl pb-12 text-center">
              <h3 className="text-2xl font-bold text-white mb-4" data-aos="zoom-y-out">
                The Old Way Is Dying
              </h3>
              <p className="text-gray-500" data-aos="zoom-y-out" data-aos-delay={100}>
                Your competitors are already using AI. They're moving faster, iterating more, and showing up everywhere. The gap widens every day.
              </p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" data-aos="zoom-y-out" data-aos-delay={200}>
              {[
                { old: "Monthly reports full of metrics", new: "Daily optimization, measurable growth" },
                { old: "Low productivity, high overhead", new: "10x output, efficient spend" },
                { old: "Same playbook for every client", new: "Completely tailored to your brand" },
                { old: "Work stops when people go home", new: "Systems that evolve overnight" },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-gray-800 bg-gray-900/30 p-5 hover:border-gray-700 transition-colors">
                  <div className="text-sm text-red-400/70 line-through mb-2">{item.old}</div>
                  <div className="text-sm text-blue-400 font-medium">{item.new}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
