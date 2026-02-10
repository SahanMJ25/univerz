"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  CheckCircle2,
  Code2,
  Camera,
  BarChart3,
  Loader2,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const serviceOptions = [
  { value: "web", label: "Web Development", icon: Code2 },
  { value: "photo", label: "Photography", icon: Camera },
  { value: "marketing", label: "Digital Marketing", icon: BarChart3 },
  { value: "combo", label: "Multiple Services", icon: CheckCircle2 },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission — replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <>
      {/* ─── Page Header ─── */}
      <section className="section-padding pt-32 bg-white grid-bg">
        <SectionHeading
          badge="Let's Connect"
          title="Get in"
          highlight="touch."
          description="Have a project in mind? Need a quote? Or just want to say hello? We'd love to hear from you."
        />
      </section>

      {/* ─── Contact Section ─── */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* ─── Left: Contact Info ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Info Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  label: "Email Us",
                  value: "teamuniverzlk@gmail.com",
                  href: "mailto:teamuniverzlk@gmail.com",
                },
                {
                  icon: Phone,
                  label: "Call Us",
                  value: "+94 77 898 3858",
                  href: "tel:+94778983858",
                },
                {
                  icon: MapPin,
                  label: "Visit Us",
                  value: "Colombo, Sri Lanka",
                  href: null,
                },
                {
                  icon: Clock,
                  label: "Working Hours",
                  value: "Mon – Sat, 9AM – 6PM",
                  href: null,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="card p-5 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand shrink-0">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-navy text-sm font-medium hover:text-brand transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-navy text-sm font-medium">
                        {item.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/94702879743?text=Hi%20Univerz!%20I%27d%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex items-center gap-4 p-5 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 hover:border-green-300 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 shrink-0 group-hover:scale-110 transition-transform">
                <MessageCircle size={24} />
              </div>
              <div>
                <p className="text-green-700 font-semibold text-base">
                  Chat on WhatsApp
                </p>
                <p className="text-green-600 text-sm mt-0.5">
                  Quick response • Usually within 30 mins
                </p>
              </div>
            </motion.a>

            {/* Quick Info */}
            <div className="card p-6">
              <h3 className="text-navy font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand" />
                What happens next?
              </h3>
              <ol className="space-y-3 text-sm text-slate-500">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-50 text-brand text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  We&apos;ll reply within 24 hours with initial thoughts.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-50 text-brand text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  A discovery call to understand your goals & requirements.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-50 text-brand text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  A tailored proposal with timeline, scope, and pricing.
                </li>
              </ol>
            </div>
          </motion.div>

          {/* ─── Right: Contact Form ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="card p-8 md:p-10">
              {isSubmitted ? (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-slate-500 max-w-sm mx-auto mb-6">
                    Thank you for reaching out. We&apos;ll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        service: "",
                        message: "",
                      });
                    }}
                    className="text-brand text-sm font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-navy mb-2">
                      Tell us about your project
                    </h3>
                    <p className="text-slate-500 text-sm">
                      Fill in the details below and we&apos;ll get the
                      conversation started.
                    </p>
                  </div>

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-600 mb-2"
                    >
                      Full Name <span className="text-brand">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-navy text-sm placeholder:text-gray-400 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/20 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-600 mb-2"
                    >
                      Email Address{" "}
                      <span className="text-brand">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-navy text-sm placeholder:text-gray-400 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/20 transition-all"
                    />
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-slate-600 mb-2"
                    >
                      Service Needed{" "}
                      <span className="text-brand">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-navy text-sm focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-gray-400">
                        Select a service...
                      </option>
                      {serviceOptions.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          className="bg-white text-navy"
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-600 mb-2"
                    >
                      Project Details{" "}
                      <span className="text-brand">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-navy text-sm placeholder:text-gray-400 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/20 transition-all resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-400 text-center mt-4">
                    By submitting this form, you agree to our privacy policy. We
                    never share your data.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
