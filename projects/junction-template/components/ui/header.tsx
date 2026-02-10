import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-[#0a0e27]/90 px-3 shadow-lg shadow-black/20 backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/10 before:[background:linear-gradient(rgba(255,255,255,0.05),rgba(255,255,255,0.02))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Desktop sign in links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              <Link
                href="#services"
                className="btn-sm text-gray-300 hover:text-white transition"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="#apply"
                className="btn-sm bg-gradient-to-t from-blue-600 to-blue-500 text-white shadow-sm hover:from-blue-500 hover:to-blue-400"
              >
                Apply Now
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
