"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useInView } from "react-intersection-observer"

const technicalSkills = [
  {
    name: "JavaScript",
    icon: "/javascript-logo.png",
    category: "language",
  },
  {
    name: "Python",
    icon: "/python-logo.png",
    category: "language",
  },
  {
    name: "C++",
    icon: "/cpp-logo.png",
    category: "language",
  },
  {
    name: "C",
    icon: "/c-logo.png",
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

// Group skills by category
const categories = {
  language: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
}

export default function TechnicalSkillsGrid() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  // Group skills by category
  const skillsByCategory = technicalSkills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, typeof technicalSkills>,
  )

  return (
    <section className="mb-20" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
      >
        Technical Skills
      </motion.h2>

      <div className="relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 to-pink-900/5 rounded-3xl"></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-600/10 rounded-full blur-3xl"></div>

        {/* Main content */}
        <div className="relative py-8 px-4 space-y-8">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category} className="space-y-4">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
              >
                {categories[category as keyof typeof categories]}
              </motion.h3>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div
                      className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
                        hoveredSkill === skill.name
                          ? "bg-gradient-to-br from-purple-900/30 to-pink-900/30 transform scale-105"
                          : "bg-gradient-to-br from-gray-900/30 to-black/30 hover:from-purple-900/20 hover:to-pink-900/20"
                      }`}
                    >
                      <div className="relative w-10 h-10 mb-2 flex items-center justify-center">
                        <Image
                          src={skill.icon || "/placeholder.svg"}
                          alt={skill.name}
                          width={32}
                          height={32}
                          className="object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <span className="text-xs text-center text-gray-300 group-hover:text-white transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
