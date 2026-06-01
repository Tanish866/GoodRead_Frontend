import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1f2433] px-8 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <p className="text-lg text-white/80">
          Copyright {new Date().getFullYear()} | All rights reserved
        </p>

        <div className="flex items-center gap-5 text-3xl text-white">
          <a
            href="#"
            aria-label="LinkedIn"
            className="transition hover:text-blue-500"
          >
            <FaLinkedin />
          </a>

          <a
            href="#"
            aria-label="Instagram"
            className="transition hover:text-pink-500"
          >
            <FaInstagram />
          </a>

          <a
            href="#"
            aria-label="Twitter"
            className="transition hover:text-sky-500"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}