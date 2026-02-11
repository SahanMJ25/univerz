"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Code2, Camera, ArrowRight, Terminal, Aperture } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const codeLines = [
  { text: "const agency = {", color: "text-brand" },
  { text: '  name: "Univerz",', color: "text-slate-500" },
  { text: '  location: "Sri Lanka",', color: "text-slate-500" },
  { text: "  services: [", color: "text-navy" },
  { text: '    "Web", "Photo", "Marketing"', color: "text-green-600" },
  { text: "  ]", color: "text-navy" },
  { text: "};", color: "text-brand" },
];

// ─── Typewriter configuration ───
const TYPING_LINES = [
  { prefix: "We ", highlight: "Build." },
  { prefix: "We ", highlight: "Capture." },
  { prefix: "We ", highlight: "Grow." },
];
const CHAR_DELAY     = 65;   // ms between characters
const LINE_PAUSE     = 400;  // ms pause between lines
const START_DELAY    = 600;  // ms before typing begins

export default function Hero() {
  // ─── Typewriter state ───
  // displayedLines: array of strings currently visible (built char by char)
  // currentLine: which line (0–2) is being typed
  // currentChar: which character index within the full line text
  // typingDone: true when all 3 lines are fully typed
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (typingDone) return;

    const fullText =
      TYPING_LINES[currentLine].prefix + TYPING_LINES[currentLine].highlight;

    // Determine delay: initial start delay, inter-line pause, or character delay
    let delay = CHAR_DELAY;
    if (currentLine === 0 && currentChar === 0) delay = START_DELAY;
    else if (currentChar === 0) delay = LINE_PAUSE;

    const timer = setTimeout(() => {
      if (currentChar < fullText.length) {
        // Type next character
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = fullText.slice(0, currentChar + 1);
          return updated;
        });
        setCurrentChar((c) => c + 1);
      } else if (currentLine < TYPING_LINES.length - 1) {
        // Move to next line
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
        setDisplayedLines((prev) => [...prev, ""]);
      } else {
        // All done
        setTypingDone(true);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [currentLine, currentChar, typingDone]);

  // Start with one empty line so the first line container exists
  useEffect(() => {
    setDisplayedLines([""]);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white grid-bg">
      {/* ─── Background Gradients ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-brand-50 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ─── LEFT: "We Build" — Code Side ─── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} custom={0} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 border border-brand/20 rounded-full text-brand text-xs font-mono font-medium">
                <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
                Digital Agency — Sri Lanka
              </span>
            </motion.div>

            {/* Heading — Typewriter Animation */}
            <motion.h1
              variants={fadeInUp}
              custom={1}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 min-h-[3.6em]"
            >
              {displayedLines.map((lineText, idx) => {
                const cfg = TYPING_LINES[idx];
                if (!cfg) return null;
                const prefixLen = cfg.prefix.length;
                // Split the currently-typed text into prefix (navy) and highlight (brand)
                const visiblePrefix = lineText.slice(0, Math.min(lineText.length, prefixLen));
                const visibleHighlight = lineText.length > prefixLen
                  ? lineText.slice(prefixLen)
                  : "";
                const isActiveLine = idx === currentLine && !typingDone;

                return (
                  <span key={idx} className="block">
                    <span className="text-navy">{visiblePrefix}</span>
                    <span className="text-brand">{visibleHighlight}</span>
                    {/* Blinking cursor on active line */}
                    {isActiveLine && (
                      <span className="inline-block w-[3px] h-[0.85em] bg-brand ml-0.5 align-middle animate-pulse rounded-sm" />
                    )}
                  </span>
                );
              })}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-slate-500 text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
            >
              From the shutter click to the server hit—we handle your{" "}
              <span className="text-navy font-medium">
                entire digital presence.
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              custom={3}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-all duration-200 shadow-lg shadow-brand/20"
              >
                Start Your Project
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-slate-600 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                View Our Work
              </Link>
            </motion.div>

            {/* Stats Strip */}
            <motion.div
              variants={fadeInUp}
              custom={4}
              className="flex gap-8 mt-12 pt-8 border-t border-gray-100"
            >
              {[
                { value: "30+", label: "Projects Delivered" },
                { value: "100%", label: "Client Satisfaction" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-navy font-mono">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── RIGHT: Visual Side — Code Window + Camera ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Code Window */}
            <div className="card p-6 glow-brand shadow-lg">
              {/* Window Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <Terminal size={12} />
                    agency.config.ts
                  </span>
                </div>
              </div>

              {/* Code Content */}
              <div className="font-mono text-sm space-y-1.5 bg-slate-50 rounded-xl p-4">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-slate-300 text-xs w-4 text-right select-none">
                      {i + 1}
                    </span>
                    <span className={line.color}>{line.text}</span>
                  </motion.div>
                ))}
                {/* Blinking Cursor */}
                <div className="flex items-center gap-4">
                  <span className="text-slate-300 text-xs w-4 text-right select-none">
                    8
                  </span>
                  <span className="w-2 h-5 bg-brand animate-pulse rounded-sm" />
                </div>
              </div>
            </div>

            {/* Floating Photography Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 card px-5 py-4 shadow-md flex items-center gap-3"
            >
              <div className="p-2.5 bg-brand-50 rounded-lg">
                <Aperture size={20} className="text-brand" />
              </div>
              <div>
                <div className="text-sm font-semibold text-navy">
                  Shot & Delivered
                </div>
                <div className="text-xs text-slate-400">
                  2,400+ Photos Edited
                </div>
              </div>
            </motion.div>

            {/* Floating Code Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.5 }}
              className="absolute -top-4 -right-4 card px-4 py-3 shadow-md flex items-center gap-2"
            >
              <Code2 size={16} className="text-brand" />
              <span className="text-xs font-mono text-brand">
                Next.js + React
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
