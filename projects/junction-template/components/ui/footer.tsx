import Link from "next/link";
import Logo from "./logo";

export default function Footer({ border = false }: { border?: boolean }) {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div
          className={`grid gap-10 py-8 sm:grid-cols-12 md:py-12 ${border ? "border-t border-gray-800" : ""}`}
        >
          {/* 1st block */}
          <div className="space-y-2 sm:col-span-12 lg:col-span-4">
            <div>
              <Logo />
            </div>
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Junction Media AI. All rights reserved.
            </div>
          </div>

          {/* 2nd block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium text-white">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-300"
                  href="#services"
                >
                  Paid Advertising
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-300"
                  href="#services"
                >
                  SEO & Content
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-300"
                  href="#services"
                >
                  AI Customer Support
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-300"
                  href="#services"
                >
                  Team Training
                </Link>
              </li>
            </ul>
          </div>

          {/* 3rd block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-300"
                  href="#"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-300"
                  href="#"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-300"
                  href="#apply"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* 4th block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium text-white">Connect</h3>
            <ul className="flex gap-1">
              <li>
                <Link
                  className="flex items-center justify-center text-gray-500 transition hover:text-blue-400"
                  href="#"
                  aria-label="Twitter"
                >
                  <svg
                    className="h-8 w-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z"></path>
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center justify-center text-gray-500 transition hover:text-blue-400"
                  href="#"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="h-8 w-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7zM12.7 21.6h-2.3V14h2.4v7.6h-.1zM11.6 13c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8h-2.4V14h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1z"></path>
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Big text */}
      <div className="relative -mt-16 h-60 w-full overflow-hidden" aria-hidden="true">
        <div className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 text-center text-[200px] md:text-[280px] font-bold leading-none text-gray-900/50">
          Junction
        </div>
        {/* Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3"
          aria-hidden="true"
        >
          <div className="h-56 w-56 rounded-full border-[20px] border-blue-700/30 blur-[80px]"></div>
        </div>
      </div>
    </footer>
  );
}
