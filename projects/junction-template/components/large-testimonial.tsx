export default function LargeTestimonial() {
  return (
    <section>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="text-center" data-aos="zoom-y-out">
            {/* Label */}
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
                Case Study
              </span>
            </div>
            
            {/* Big stat */}
            <div className="mb-6">
              <span className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                30%
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Above Store Record in Monthly Sales
            </h3>
            
            {/* Story */}
            <div className="max-w-2xl mx-auto text-left space-y-4 text-gray-400 mb-8">
              <p>
                <span className="text-white font-medium">Deep Blue Health</span> is a New Zealand health supplement company 
                with wide distribution but limited resources. With dozens of brands, hundreds of products, and a small team—execution 
                across the board was nearly impossible.
              </p>
              <p>
                What AI agents enabled: an <span className="text-blue-400">incredibly high level of productivity</span> for 
                their spend. We could suddenly manage the complexity—coordinating global distribution, rebuilding SEO from scratch, 
                deploying AI customer support—while actually expanding their reach.
              </p>
              <p>
                The result? Not just breaking their sales record, but <span className="text-blue-400">doing it efficiently</span>. 
                The trajectory keeps climbing, and we're building toward something that could dominate the space.
              </p>
            </div>
            
            {/* Key metrics */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8" data-aos="zoom-y-out" data-aos-delay={100}>
              <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-4">
                <div className="text-2xl font-bold text-blue-400">30%+</div>
                <div className="text-xs text-gray-500">Above Record</div>
              </div>
              <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-4">
                <div className="text-2xl font-bold text-green-400">Global</div>
                <div className="text-xs text-gray-500">Distribution</div>
              </div>
              <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-4">
                <div className="text-2xl font-bold text-purple-400">10x</div>
                <div className="text-xs text-gray-500">Efficiency</div>
              </div>
            </div>
            
            {/* Company tag */}
            <div>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 text-gray-400 text-sm">
                Deep Blue Health • NZ Health Supplements
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
