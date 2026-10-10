"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function GalleryCTA() {
  return (
    <section className="relative w-full bg-ivory min-h-[100vh] text-charcoal py-24 md:py-32 overflow-hidden z-20 flex items-center justify-center">
      {/* Top Gold Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent z-10" />

      {/* Animated Subtle Glows */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-[5%] left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-gold/10 rounded-full blur-[90px] pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[5%] right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-orange-900/5 rounded-full blur-[90px] pointer-events-none"
      />

      {/* Floating Gallery Images for Parallax Appeal */}
      <motion.div
        className="absolute top-[15%] left-[8%] w-32 h-40 md:w-52 md:h-72 rounded-[2rem] overflow-hidden shadow-2xl -rotate-6 hidden lg:block"
        initial={{ y: 0 }}
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/1.jpg" alt="Coffee Beans" fill className="object-cover" />
        <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
      </motion.div>
      <motion.div
        className="absolute bottom-[10%] right-[8%] w-36 h-44 md:w-60 md:h-80 rounded-[2rem] overflow-hidden shadow-2xl rotate-6 hidden lg:block"
        initial={{ y: 0 }}
        animate={{ y: [15, -15, 15] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Image src="/7.jpg" alt="Barista at work" fill className="object-cover" />
        <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
      </motion.div>
      <motion.div
        className="absolute top-[15%] right-[8%] w-32 h-40 md:w-52 md:h-72 rounded-[2rem] overflow-hidden shadow-2xl -rotate-6 hidden lg:block"
        initial={{ y: 0 }}
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/10.jpg" alt="Coffee Beans" fill className="object-cover" />
        <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
      </motion.div>
      <motion.div
        className="absolute bottom-[10%] left-[8%] w-36 h-44 md:w-60 md:h-80 rounded-[2rem] overflow-hidden shadow-2xl rotate-6 hidden lg:block"
        initial={{ y: 0 }}
        animate={{ y: [15, -15, 15] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Image src="/11.jpg" alt="Barista at work" fill className="object-cover" />
        <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
      </motion.div>

      {/* Main Glass/Card Wrapper */}
      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center flex flex-col items-center w-full bg-white/40 backdrop-blur-xl border border-white/60 p-10 md:p-20 max-md:p-6 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.03)]"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-body text-[10px] tracking-[0.4em] text-gold uppercase mb-6 block"
          >
            Experience It Live
          </motion.span>

          <h2 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] max-md:text-4xl font-light tracking-tight mb-8 leading-[1.1] text-charcoal">
            Step into our <br />
            <span className="italic text-charcoal/70 pr-4">sanctuary.</span>
          </h2>

          <p className="font-body max-w-md mx-auto text-stone text-sm md:text-base leading-relaxed mb-12">
            Every cup has a story. Visit us to taste the craft, or follow our daily rituals and behind-the-scenes magic directly from our espresso bar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
            {/* Primary 'Visit Us' Button */}
            <Link
              href="/visit"
              className="group relative overflow-hidden flex items-center justify-center gap-3 bg-charcoal text-ivory text-[11px] tracking-[0.25em] uppercase px-10 py-5 rounded-full font-body shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all duration-500 hover:scale-[1.02] w-full sm:w-auto"
            >
              <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-full" />
              <span className="relative z-10 font-semibold">Visit Us</span>
            </Link>

            {/* Secondary 'Instagram' Button */}
            <a
              href="https://www.instagram.com/capeybara.srt"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 p-2 pr-8 rounded-full bg-white/60 border border-charcoal/5 hover:border-gold/50 transition-colors duration-500 overflow-hidden shadow-sm hover:bg-white w-full sm:w-auto"
            >
              <div className="relative z-10 w-12 h-12 rounded-full bg-charcoal text-ivory flex items-center justify-center shrink-0 group-hover:bg-gold transition-colors duration-500 shadow-md">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>

              <span className="relative z-10 flex flex-col items-start justify-center pr-2">
                <span className="font-body text-[9px] tracking-[0.2em] uppercase text-stone group-hover:text-charcoal transition-colors duration-500">Instagram</span>
                <span className="font-display italic text-base font-medium tracking-wide text-charcoal transition-colors duration-500">@capeybara.srt</span>
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
