import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const LOGO_SRC = "/BookNook Open-Book Emblem.png"; // put your logo image link here

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { name: "X (Twitter)", href: "https://x.com", icon: FaXTwitter },
  { name: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { name: "GitHub", href: "https://github.com", icon: FaGithub },
];

const Footer = () => {
  return (
    <footer className="bg-[#004D3B]/90 text-[#FFF8E7]">
      <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-3">
        {/* Logo + About */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/BookNook Open-Book Emblem.png"
              alt="BookNook logo"
              width={100}
              height={50}
              className="h-20 w-40 object-contain"
            />
            
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-[#FFF8E7]/80">
            Borrow your next read and share your own books with a community of
            book lovers.
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#FFAA00]">Contact Us</h3>
          <ul className="space-y-3 text-sm text-[#FFF8E7]/80">
            <li className="flex items-center gap-2">
              <FaEnvelope className="h-4 w-4 shrink-0 text-[#FFAA00]" />
              <a
                href="mailto:support@booknook.com"
                className="hover:text-[#FFAA00]"
              >
                support@booknook.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="h-4 w-4 shrink-0 text-[#FFAA00]" />
              <a href="tel:+8801700000000" className="hover:text-[#FFAA00]">
                +880 1700-000000
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="h-4 w-4 shrink-0 text-[#FFAA00]" />
              <span>Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#FFAA00]">Follow Us</h3>
          <div className="flex gap-3">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFF8E7]/30 transition-all hover:border-[#FFAA00] hover:bg-[#FFAA00] hover:text-[#004D3B]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#FFF8E7]/15">
        <p className="container mx-auto px-4 py-4 text-center text-sm text-[#FFF8E7]/70">
          © {new Date().getFullYear()} BookNook. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
