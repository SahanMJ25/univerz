"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Code2,
  Camera,
  BarChart3,
  ArrowRight,
  Sparkles,
  Globe,
  ShieldCheck,
  Users,
} from "lucide-react";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import SectionHeading from "@/components/SectionHeading";
import ParticleBackground from "@/components/ParticleBackground";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Custom-coded websites that load fast and convert. Specialty in eco-lodges, export companies, and e-commerce platforms built with React & Next.js.",
    accent: "cyan" as const,
  },
  {
    icon: Camera,
    title: "Professional Photography",
    description:
      "High-end commercial, product, and resort photography. AI-enhanced editing for flawless visuals that sell your brand story.",
    accent: "orange" as const,
  },
  {
    icon: BarChart3,
    title: "Digital Marketing",
    description:
      "Strategic social media management, reputation building, and SEO that drives organic growth and measurable ROI.",
    accent: "cyan" as const,
  },
];

const whyUs = [
  {
    icon: Sparkles,
    title: "Custom, Never Templates",
    description:
      "Every line of code is written for you. No cookie-cutter solutions.",
  },
  {
    icon: Globe,
    title: "Local + Global",
    description:
      "Based in Sri Lanka, serving clients worldwide with competitive pricing.",
  },
  {
    icon: ShieldCheck,
    title: "End-to-End Ownership",
    description:
      "From concept to deployment and ongoing support—we own the process.",
  },
  {
    icon: Users,
    title: "Education-Rooted",
    description:
      "Our team comes from an ICT teaching background—we explain, not just execute.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── Interactive Particle Background ─── */}
      <ParticleBackground />

      {/* ─── Hero Section ─── */}
      <Hero />

      {/* ─── Services Grid ─── */}
      <section className="section-padding bg-white">
        <SectionHeading
          badge="Our Services"
          title="One agency."
          highlight="Three superpowers."
          description="We combine code, camera, and content strategy into a unified digital solution that drives results."
        />

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              accent={service.accent}
              index={i}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-brand text-sm font-medium hover:gap-3 transition-all duration-200"
          >
            Explore all services
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section className="section-padding bg-gray-50 grid-bg">
        <SectionHeading
          badge="Why Us"
          title="Built different."
          highlight="By design."
          description="We're not just another agency. We're developers who design, photographers who code, and marketers who measure."
        />

        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center p-6"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-brand-50 flex items-center justify-center text-brand">
                <item.icon size={22} />
              </div>
              <h3 className="text-navy font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── About / Founder Section ─── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="card p-8 space-y-6 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-brand rounded-full animate-pulse" />
                <span className="font-mono text-sm text-slate-400">
                  about_us.md
                </span>
              </div>
              <div className="space-y-4 font-mono text-sm bg-gray-50 rounded-xl p-4">
                <p className="text-brand">## Our Story</p>
                <p className="text-slate-500 leading-relaxed">
                  It started in a classroom. Teaching ICT to the next generation,
                  we realized that most local businesses were being left behind
                  in the digital race — not because they lacked ambition, but
                  because they lacked a partner who truly understood both the
                  tech and the art.
                </p>
                <p className="text-brand-dark">## The Pivot</p>
                <p className="text-slate-500 leading-relaxed">
                  From blackboards to browsers. We combined deep technical
                  knowledge with a creative eye, building websites that
                  don&apos;t just work — they inspire. Today, Univerz is a
                  full-spectrum digital agency serving eco-lodges, exporters, and
                  ambitious brands across Sri Lanka and beyond.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 border border-brand/20 rounded-full text-brand text-xs font-mono font-medium mb-6">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              From ICT educator to{" "}
              <span className="text-brand">agency founder.</span>
            </h2>
            <div className="space-y-4 text-slate-500 leading-relaxed">
              <p>
                Univerz was born from a simple belief: every business deserves a
                digital presence that matches its ambition. Our founder spent
                years in ICT education, training students in programming,
                networking, and digital literacy. That experience taught one
                crucial lesson — technology only matters when it&apos;s
                accessible.
              </p>
              <p>
                That teaching mindset shapes everything we do. We don&apos;t
                just deliver a website or a photo set — we walk our clients
                through every decision, ensuring they understand and own their
                digital assets. The result? Long-term partnerships built on
                trust, transparency, and measurable outcomes.
              </p>
              <p>
                Today, Univerz stands at the intersection of{" "}
                <span className="text-navy font-medium">
                  technical precision
                </span>{" "}
                and{" "}
                <span className="text-navy font-medium">creative art</span> —
                a full-stack agency that codes, captures, and campaigns with
                equal expertise.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-dark transition-all shadow-sm"
              >
                Let&apos;s Talk
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="section-padding bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center card p-12 md:p-16 relative overflow-hidden shadow-md"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-brand/50 to-transparent" />

          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Ready to go{" "}
            <span className="text-brand">digital?</span>
          </h2>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto">
            Whether you need a website, a photo shoot, or a complete marketing
            strategy — we&apos;re one message away.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
            >
              Start Your Project
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/94702879743"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 border border-green-200 text-green-700 font-semibold rounded-lg hover:bg-green-100 transition-all"
            >
              💬 Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
