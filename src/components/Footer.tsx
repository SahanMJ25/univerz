import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Code2,
  Camera,
  BarChart3,
} from "lucide-react";

const footerServices = [
  { label: "Web Development", href: "/services#web" },
  { label: "Photography", href: "/services#photography" },
  { label: "Digital Marketing", href: "/services#marketing" },
];

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-navy border-t border-navy-light">
      {/* ─── Main Footer ─── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Univerz"
                className="h-11 w-11 rounded-xl shadow-md object-cover"
              />
              <span className="text-xl font-bold text-white tracking-tight">
                Univerz
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              From the shutter click to the server hit—we handle your entire
              digital presence. Based in Sri Lanka, delivering worldwide.
            </p>
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-brand/10 text-brand">
                <Code2 size={16} />
              </span>
              <span className="p-2 rounded-lg bg-brand/10 text-brand">
                <Camera size={16} />
              </span>
              <span className="p-2 rounded-lg bg-brand/10 text-brand">
                <BarChart3 size={16} />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-brand text-sm transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {footerServices.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-brand text-sm transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-brand mt-0.5 shrink-0"
                />
                <span className="text-slate-400 text-sm">
                  Colombo, Sri Lanka
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-brand mt-0.5 shrink-0" />
                <a
                  href="mailto:teamuniverzlk@gmail.com"
                  className="text-slate-400 hover:text-brand text-sm transition-colors"
                >
                  teamuniverzlk@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  size={16}
                  className="text-brand mt-0.5 shrink-0"
                />
                <a
                  href="tel:+94778983858"
                  className="text-slate-400 hover:text-brand text-sm transition-colors"
                >
                  +94 77 898 3858
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} Univerz Digital Agency. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
