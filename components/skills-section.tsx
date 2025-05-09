"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { useState } from "react"

const skills = [
  {
    name: "JavaScript",
    icon: "/javascript-logo.png",
    category: "language",
  },
  {
    name: "React",
    icon: "/react-logo.png",
    category: "frontend",
  },
  {
    name: "Node.js",
    icon: "/nodejs-logo.png",
    category: "backend",
  },
  {
    name: "MongoDB",
    icon: "/mongodb-logo.png",
    category: "database",
  },
  {
    name: "Express",
    icon: "/express-logo.png",
    category: "backend",
  },
  {
    name: "Next.js",
    icon: "/nextjs-logo.png",
    category: "frontend",
  },
  {
    name: "TypeScript",
    icon: "/typescript-logo.png",
    category: "language",
  },
  {
    name: "HTML5",
    icon: "/html5-logo.png",
    category: "frontend",
  },
  {
    name: "CSS3",
    icon: "/css3-logo.png",
    category: "frontend",
  },
  {
    name: "Tailwind CSS",
    icon: "/tailwindcss-logo.png",
    category: "frontend",
  },
]

export default function SkillsSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <section className="mb-20" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
      >
        Professional Skillset
      </motion.h2>

      <div className="relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 to-pink-900/5 rounded-3xl"></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-600/10 rounded-full blur-3xl"></div>

        {/* Main content */}
        <div className="relative py-16 px-4">
          <motion.div
            className="flex flex-wrap justify-center gap-x-12 gap-y-16"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="group"
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: [0.215, 0.61, 0.355, 1],
                    },
                  },
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                whileHover={{ scale: 1.1 }}
              >
                <div className="relative flex flex-col items-center">
                  {/* Glowing background effect */}
                  <div
                    className={`absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${hoveredSkill === skill.name ? "opacity-100" : ""}`}
                  ></div>

                  {/* Icon container */}
                  <motion.div
                    className="relative z-10 w-20 h-20 md:w-24 md:h-24 mb-3 flex items-center justify-center"
                    animate={
                      hoveredSkill === skill.name
                        ? {
                            y: [0, -10, 0],
                            transition: {
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                            },
                          }
                        : {}
                    }
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-full"></div>
                    <div className="absolute inset-0.5 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full"></div>
                    <div className="absolute inset-1 bg-black rounded-full"></div>
                    <div className="relative w-12 h-12 md:w-14 md:h-14">
                      <Image
                        src={skill.icon || "/placeholder.svg"}
                        alt={skill.name}
                        fill
                        className="object-contain drop-shadow-lg"
                      />
                    </div>
                  </motion.div>

                  {/* Skill name */}
                  <motion.p
                    className="text-gray-400 group-hover:text-white transition-colors duration-300 font-medium text-center"
                    animate={
                      hoveredSkill === skill.name
                        ? {
                            scale: [1, 1.1, 1],
                            transition: {
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                            },
                          }
                        : {}
                    }
                  >
                    {skill.name}
                  </motion.p>

                  {/* Category tag */}
                  <motion.span
                    className="mt-1 text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      hoveredSkill === skill.name
                        ? {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.3 },
                          }
                        : {}
                    }
                  >
                    {skill.category}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Connecting lines */}
          <svg
            className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <g stroke="url(#lineGradient)" strokeWidth="0.5">
              <line x1="10%" y1="20%" x2="30%" y2="40%" />
              <line x1="30%" y1="40%" x2="50%" y2="20%" />
              <line x1="50%" y1="20%" x2="70%" y2="40%" />
              <line x1="70%" y1="40%" x2="90%" y2="20%" />
              <line x1="20%" y1="60%" x2="40%" y2="80%" />
              <line x1="40%" y1="80%" x2="60%" y2="60%" />
              <line x1="60%" y1="60%" x2="80%" y2="80%" />
              <line x1="30%" y1="40%" x2="40%" y2="80%" />
              <line x1="70%" y1="40%" x2="60%" y2="60%" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}
