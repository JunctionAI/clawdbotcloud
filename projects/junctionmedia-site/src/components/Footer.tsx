import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/case-study", label: "Case Studies" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-card-bg border-t border-card-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold">
              <span className="gradient-text">Junction</span>
              <span className="text-white"> Media AI</span>
            </Link>
            <p className="text-muted mt-2">AI-powered marketing that actually works.</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-card-border text-center">
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} Junction Media AI. All rights reserved.
          </p>
          <p className="text-muted text-sm mt-2">
            junctionmedia.ai
          </p>
        </div>
      </div>
    </footer>
  );
}
