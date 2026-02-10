"use client";

import { useState } from "react";
import Image from "next/image";
import Stripes from "@/public/images/stripes-dark.svg";

export default function Cta() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // Create mailto link with form data
    const subject = encodeURIComponent("Partnership Application");
    const body = encodeURIComponent(`Email: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:tom@junctionmedia.ai?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1000);
  };

  return (
    <section id="apply">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-2xl text-center shadow-xl before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-b before:from-gray-900 before:to-[#0a0e27]"
          data-aos="zoom-y-out"
        >
          {/* Glow */}
          <div
            className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-1/2"
            aria-hidden="true"
          >
            <div className="h-56 w-[480px] rounded-full border-[20px] border-blue-500/50 blur-3xl" />
          </div>
          
          {/* Stripes illustration */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform opacity-30"
            aria-hidden="true"
          >
            <Image
              className="max-w-none"
              src={Stripes}
              width={768}
              height={432}
              alt="Stripes"
            />
          </div>
          
          <div className="px-4 py-12 md:px-12 md:py-20">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to Work With the Future?
            </h2>
            <p className="mb-8 text-lg text-gray-400 max-w-2xl mx-auto">
              We don't work with everyone. We cap partnerships to ensure every client gets the dedicated attention 
              they deserve. We want growth partners who truly see the potential.
            </p>
            
            {/* Contact Form */}
            <div className="max-w-md mx-auto">
              {sent ? (
                <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-6 text-center">
                  <div className="text-green-400 text-lg font-medium mb-2">Thanks for reaching out!</div>
                  <p className="text-gray-400 text-sm">
                    Your email client should have opened. If it didn't, email us directly at{" "}
                    <a href="mailto:tom@junctionmedia.ai" className="text-blue-400 hover:underline">
                      tom@junctionmedia.ai
                    </a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Tell us about your business and goals..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={4}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn group w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-lg hover:bg-[length:100%_150%] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative inline-flex items-center">
                      {sending ? "Opening email..." : "Get in Touch"}
                      {!sending && (
                        <span className="ml-1 tracking-normal text-blue-300 transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
            
            {/* Direct email option */}
            <p className="mt-6 text-sm text-gray-500">
              Or email directly:{" "}
              <a href="mailto:tom@junctionmedia.ai" className="text-blue-400 hover:underline">
                tom@junctionmedia.ai
              </a>
            </p>
            
            {/* Info */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                $10,000/month
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                3-month minimum
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                2 spots remaining
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="text-center text-sm text-gray-500">
          <p className="mb-2">Junction Media AI • Auckland, New Zealand</p>
          <p>
            <a href="mailto:tom@junctionmedia.ai" className="text-gray-400 hover:text-white transition-colors">
              tom@junctionmedia.ai
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
