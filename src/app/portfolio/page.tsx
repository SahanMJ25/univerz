"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Code2,
  Camera,
  BarChart3,
  ArrowRight,
  Eye,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

/* ─────────────────────────────────────────────────────────────
   ✏️  HOW TO ADD / EDIT PROJECTS:
   
   Just copy one block, paste below, and fill in your details.
   Each project needs:
     - id:          A unique number (1, 2, 3...)
     - category:    "web" | "photo" | "marketing"
     - title:       Project name
     - subtitle:    Short label (e.g. "E-Commerce Website")
     - description: 1-2 sentence summary
     - tags:        List of tech/skills used
     - stats:       A result or metric (optional, delete if none)

   Example:
   {
     id: 1,
     category: "web",
     title: "Client Name",
     subtitle: "Type of Project",
     description: "What you did for this client.",
     tags: ["React", "Node.js"],
     stats: "Result you achieved",
   },
   ───────────────────────────────────────────────────────────── */

const portfolioItems = [
  // ──── ADD YOUR PROJECTS BELOW ────

  // {
  //   id: 1,
  //   category: "web" as const,
  //   title: "Project Name",
  //   subtitle: "Website / App / Store",
  //   description: "Briefly describe what you built for this client.",
  //   tags: ["Next.js", "React", "Tailwind"],
  //   stats: "Some impressive result",
  // },

  // {
  //   id: 2,
  //   category: "photo" as const,
  //   title: "Photo Project Name",
  //   subtitle: "Product / Hotel / Event Photography",
  //   description: "Briefly describe the photography work.",
  //   tags: ["Product", "Lifestyle", "Drone"],
  //   stats: "100+ photos delivered",
  // },

  // {
  //   id: 3,
  //   category: "marketing" as const,
  //   title: "Marketing Project Name",
  //   subtitle: "SEO / Social Media / Ads",
  //   description: "Briefly describe the marketing campaign.",
  //   tags: ["SEO", "Facebook Ads", "Content"],
  //   stats: "2x traffic growth",
  // },

  // ──── ADD MORE PROJECTS HERE ────
];

type Category = "all" | "web" | "photo" | "marketing";

const categories: { key: Category; label: string; icon: typeof Code2 }[] = [
  { key: "all", label: "All Work", icon: Eye },
  { key: "web", label: "Web", icon: Code2 },
  { key: "photo", label: "Photo", icon: Camera },
  { key: "marketing", label: "Marketing", icon: BarChart3 },
];

export default function PortfolioPage() {
  const [active, setActive] = useState<Category>("all");

  const filtered =
    active === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === active);

  const hasProjects = portfolioItems.length > 0;

  return (
    <>
      {/* ─── Page Header ─── */}
      <section className="section-padding pt-32 bg-white grid-bg">
        <SectionHeading
          badge="Our Work"
          title="Portfolio of"
          highlight="results."
          description="Real projects. Real outcomes. Browse our work across web development, photography, and digital marketing."
        />

        {/* ─── Filter Tabs (only show if there are projects) ─── */}
        {hasProjects && (
          <div className="flex justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active === cat.key
                    ? "bg-brand-50 text-brand border border-brand/30"
                    : "text-slate-500 hover:text-navy hover:bg-gray-50 border border-transparent"
                }`}
              >
                <cat.icon size={14} />
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* ─── Project Grid ─── */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {hasProjects ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
              >
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="break-inside-avoid card overflow-hidden group hover:shadow-lg transition-all duration-300"
                  >
                    {/* Top color bar */}
                    <div className="h-1 bg-gradient-to-r from-brand to-brand-dark" />

                    <div className="p-6">
                      {/* Category */}
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-brand mb-4">
                        {item.category === "web" && <Code2 size={12} />}
                        {item.category === "photo" && <Camera size={12} />}
                        {item.category === "marketing" && (
                          <BarChart3 size={12} />
                        )}
                        {item.subtitle}
                      </span>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-navy mb-3">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-500 text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Stats (optional) */}
                      {item.stats && (
                        <div className="bg-brand-50 border border-brand/10 rounded-lg px-4 py-2.5 mb-4 inline-block">
                          <span className="text-xs font-mono text-brand">
                            📊 {item.stats}
                          </span>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-xs font-mono text-slate-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            /* ─── Empty State (shown when no projects yet) ─── */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-brand-50 flex items-center justify-center">
                <Eye size={36} className="text-brand" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-3">
                Projects Coming Soon
              </h3>
              <p className="text-slate-500 max-w-md mx-auto mb-8">
                We&apos;re curating our best work to showcase here. In the
                meantime, get in touch to see examples of what we can do for you.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
              >
                Get in Touch
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-padding bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Want to be our{" "}
            <span className="text-brand">next success story?</span>
          </h2>
          <p className="text-slate-500 mb-8">
            Let&apos;s build something remarkable together. Tell us about your
            project and we&apos;ll show you what&apos;s possible.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
          >
            Start a Conversation
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
