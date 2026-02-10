import PageIllustration from "@/components/page-illustration";

export default function HeroHome() {
  return (
    <section className="relative">
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            {/* Limited capacity badge */}
            <div
              className="mb-6 border-y [border-image:linear-gradient(to_right,transparent,rgba(96,165,250,0.4),transparent)1]"
              data-aos="zoom-y-out"
            >
              <div className="flex justify-center py-3">
                <span className="inline-flex items-center gap-2 text-sm text-blue-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400"></span>
                  </span>
                  Limited Capacity — Only 2 Spots Remaining
                </span>
              </div>
            </div>
            
            <h1
              className="mb-6 border-y text-5xl font-bold text-white [border-image:linear-gradient(to_right,transparent,rgba(96,165,250,0.4),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              Evolve Your Business <br className="max-lg:hidden" />
              at the Speed of AI
            </h1>
            
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-400"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                Strategic minds armed with autonomous AI agents. We don't just use these tools—we 
                supercharge your entire operation with them. Growth partners for businesses ready to dominate.
              </p>
              
              <div className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,rgba(96,165,250,0.4),transparent)1]">
                <div
                  className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay={450}
                >
                  <a
                    className="btn group mb-4 w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-lg hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                    href="#apply"
                  >
                    <span className="relative inline-flex items-center">
                      Apply for Partnership{" "}
                      <span className="ml-1 tracking-normal text-blue-300 transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn w-full border border-gray-700 bg-transparent text-gray-300 hover:border-gray-600 hover:text-white sm:ml-4 sm:w-auto"
                    href="#model"
                  >
                    See How We Work
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Value proposition cards */}
          <div
            className="mx-auto max-w-4xl"
            data-aos="zoom-y-out"
            data-aos-delay={600}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="relative rounded-2xl bg-gray-900/50 border border-gray-800 p-6 text-center hover:border-blue-500/50 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <div className="relative">
                  <div className="text-3xl font-bold text-blue-400 mb-1">10x</div>
                  <div className="text-sm text-gray-400">Productivity Multiplier</div>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="relative rounded-2xl bg-gray-900/50 border border-gray-800 p-6 text-center hover:border-blue-500/50 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <div className="relative">
                  <div className="text-3xl font-bold text-blue-400 mb-1">Daily</div>
                  <div className="text-sm text-gray-400">Optimization Cycles</div>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="relative rounded-2xl bg-gray-900/50 border border-gray-800 p-6 text-center hover:border-blue-500/50 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <div className="relative">
                  <div className="text-3xl font-bold text-blue-400 mb-1">30%+</div>
                  <div className="text-sm text-gray-400">Above Record Sales</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
