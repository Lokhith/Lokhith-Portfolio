"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function AboutSection() {
  return (
    <section className="mb-20">
      <div className="relative mb-20 text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold animated-gradient-text relative z-10"
        >
          {Array.from("Know who I am...").map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.5 + index * 0.08,
                ease: "easeOut",
              }}
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 2.5, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-8"
          style={{ bottom: "-16px" }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, delay: 3, repeat: 3, repeatType: "reverse" }}
          className="absolute -inset-10 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl z-0"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center p-6 rounded-2xl glass-morphism">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-600/10 rounded-full blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl cosmic-glow-purple transform hover:scale-[1.02] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 z-10" />
            <Image
              src="/about-pic.jpeg"
              alt="Lokhith Aswa"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full opacity-30 blur-2xl z-0"></div>
          <div className="absolute -top-5 -left-5 w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full opacity-30 blur-2xl z-0"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-4 sm:p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-500/10 shadow-lg shadow-purple-500/5 hover:shadow-purple-500/20 hover:border-purple-500/30 transition-all duration-300 transform hover:-translate-y-1 glass-card"
          >
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-xl">
                Visionary Developer & Digital Craftsman
              </span>{" "}
              — I'm <span className="font-bold text-purple-400">Lokhith Aswa A</span>, a passionate technologist who
              transforms complex challenges into elegant digital solutions. With an insatiable curiosity and creative
              mindset, I blend technical expertise with artistic vision to build experiences that resonate with users
              and solve real-world problems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="p-6 bg-gradient-to-br from-pink-900/20 to-purple-900/20 rounded-xl border border-pink-500/10 shadow-lg shadow-pink-500/5 hover:shadow-pink-500/20 hover:border-pink-500/30 transition-all duration-300 transform hover:-translate-y-1 glass-card"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 text-xl">
                Full-Stack Maestro
              </span>{" "}
              — My expertise in the <span className="font-bold text-pink-400">MERN ecosystem</span> allows me to
              orchestrate every aspect of web development, from crafting pixel-perfect interfaces to architecting robust
              backend systems. I don't just write code; I create digital experiences that blend innovation with
              performance, ensuring each project stands at the intersection of technology and human-centered design.
            </p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="mt-8 flex justify-center md:justify-start">
            <Link
              href="/resume"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center gap-2 cosmic-glow-purple"
            >
              View My Resume
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
