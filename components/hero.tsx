"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, X } from "lucide-react"
import ContactForm from "./contact-form"
import { useMediaQuery } from "@/hooks/use-media-query"

const roles = ["Software Developer", "MERN Stack Developer", "Prompt Engineer"]

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [typingComplete, setTypingComplete] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const controls = useAnimation()
  const textRef = useRef<HTMLHeadingElement>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")

  // For typing animation
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const fullText = "I'm Lokhith Aswa A"

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Typing effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.substring(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 100)
      return () => clearTimeout(timeout)
    } else {
      setTypingComplete(true)
    }
  }, [currentIndex, fullText])

  // Sequence animations
  useEffect(() => {
    if (typingComplete) {
      controls.start("visible")
    }
  }, [typingComplete, controls])

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (showContactForm) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [showContactForm])

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center relative overflow-hidden pt-16 sm:pt-20">
      {/* Main content */}
      <div className="relative z-10 w-[95%] max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8 rounded-xl sm:rounded-2xl glass-morphism">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-32 sm:w-40 h-32 sm:h-40 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-32 sm:w-40 h-32 sm:h-40 bg-pink-600/10 rounded-full blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-8 relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] mx-auto"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-xl animate-pulse" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-purple-500/50 shadow-lg cosmic-glow-purple p-1">
            <div className="absolute inset-1 rounded-full overflow-hidden">
              <Image
                src="/profile-pic.jpeg"
                alt="Lokhith Aswa"
                fill
                sizes="(max-width: 640px) 120px, (max-width: 768px) 140px, (max-width: 1024px) 160px, 180px"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Decorative circles */}
          <motion.div
            className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 1,
            }}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-light mb-3 sm:mb-4 text-gray-300"
        >
          Hi there
          <motion.span
            animate={{ rotate: [0, 10, 0, 10, 0] }}
            transition={{ duration: 1.5, delay: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
            className="inline-block ml-2"
          >
            👋
          </motion.span>
        </motion.h2>

        <motion.h1
          ref={textRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold animated-gradient-text relative mb-2 sm:mb-4"
        >
          {displayText}
          {!typingComplete && (
            <span className="absolute -right-3 sm:-right-4 bottom-0 w-1 sm:w-1.5 md:w-2 h-6 sm:h-8 md:h-10 lg:h-12 bg-purple-400 animate-blink" />
          )}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={typingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-12 sm:h-16 flex items-center justify-center"
        >
          <div className="relative h-12 sm:h-16 overflow-hidden">
            {roles.map((role, index) => (
              <motion.h3
                key={role}
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: currentRoleIndex === index ? 1 : 0,
                  y: currentRoleIndex === index ? 0 : 50,
                }}
                transition={{ duration: 0.5 }}
                className="text-lg sm:text-xl md:text-2xl font-medium text-gray-300 absolute inset-0 flex items-center justify-center"
              >
                {role}
              </motion.h3>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="mt-4 sm:mt-6 flex flex-col items-center space-y-8 sm:space-y-12"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Link
              href="/projects"
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm sm:text-base font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center gap-2 cosmic-glow-purple"
            >
              Explore My Work
              <ArrowRight size={isMobile ? 16 : 18} />
            </Link>
          </motion.div>

          {/* Unique Get in Touch Button */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="w-full max-w-md px-2 sm:px-0"
          >
            <motion.button
              onClick={() => setShowContactForm(true)}
              className="w-full relative"
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              {/* Neon effect container */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 opacity-75"
                  variants={{
                    rest: { opacity: 0.5, scale: 0.98 },
                    hover: { opacity: 0.8, scale: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Animated light beams */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-[200%] h-40 -translate-x-1/2 -translate-y-1/2 bg-white/30 blur-3xl"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Content container */}
              <div className="relative bg-black/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-orange-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {/* Animated icon */}
                    <div className="relative mr-3 sm:mr-4">
                      <motion.div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center cosmic-glow-pink"
                        variants={{
                          rest: { scale: 1 },
                          hover: { scale: 1.1 },
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                          variants={{
                            rest: { rotate: 0 },
                            hover: { rotate: 360 },
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                          <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                        </motion.svg>
                      </motion.div>

                      {/* Animated particles */}
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-yellow-300"
                          initial={{
                            x: 0,
                            y: 0,
                            opacity: 0,
                          }}
                          variants={{
                            rest: { opacity: 0 },
                            hover: {
                              x: [0, (Math.random() - 0.5) * 30],
                              y: [0, (Math.random() - 0.5) * 30],
                              opacity: [0, 1, 0],
                              transition: {
                                duration: 1 + Math.random(),
                                repeat: Number.POSITIVE_INFINITY,
                                delay: Math.random() * 0.5,
                              },
                            },
                          }}
                        />
                      ))}
                    </div>

                    {/* Text content */}
                    <div>
                      <motion.p
                        className="text-orange-300 text-xs sm:text-sm font-medium"
                        variants={{
                          rest: { opacity: 0.8 },
                          hover: { opacity: 1 },
                        }}
                      >
                        Let's create something amazing
                      </motion.p>
                      <motion.h3
                        className="text-white text-base sm:text-xl font-bold"
                        variants={{
                          rest: { scale: 1 },
                          hover: { scale: 1.05 },
                        }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        Get in Touch
                      </motion.h3>
                    </div>
                  </div>

                  {/* Animated arrow */}
                  <motion.div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 flex items-center justify-center"
                    variants={{
                      rest: { x: 0 },
                      hover: { x: 5 },
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 sm:w-5 sm:h-5 text-orange-300"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>

                {/* Animated highlight line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500"
                  initial={{ width: "0%" }}
                  variants={{
                    rest: { width: "0%" },
                    hover: { width: "100%" },
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowContactForm(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
              className="relative z-10 w-full max-w-md max-h-[85vh] overflow-auto hide-scrollbar rounded-xl sm:rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20">
                {/* Close button */}
                <button
                  onClick={() => setShowContactForm(false)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors z-20 bg-gray-800/50 p-1.5 sm:p-2 rounded-full hover:bg-gray-700/50"
                >
                  <X size={isMobile ? 18 : 20} />
                </button>

                {/* Form */}
                <ContactForm onClose={() => setShowContactForm(false)} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
