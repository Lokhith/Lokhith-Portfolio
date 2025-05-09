"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import {
  Code,
  PenToolIcon as Tool,
  Users,
  MessageSquare,
  LightbulbIcon,
  Clock,
  Target,
  Puzzle,
  Brain,
  Workflow,
  Sparkles,
} from "lucide-react"

// Technical skills data
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

// Soft skills data
const softSkills = [
  {
    name: "Leadership",
    icon: <Users size={24} />,
    description: "Guiding teams with vision and empathy to achieve collective goals and foster growth.",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Communication",
    icon: <MessageSquare size={24} />,
    description: "Articulating ideas clearly and listening actively to ensure effective information exchange.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Problem Solving",
    icon: <Puzzle size={24} />,
    description: "Analyzing challenges methodically and developing innovative solutions with a strategic approach.",
    color: "from-amber-500 to-red-500",
  },
  {
    name: "Time Management",
    icon: <Clock size={24} />,
    description: "Prioritizing tasks effectively to maximize productivity and meet deadlines consistently.",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Adaptability",
    icon: <Workflow size={24} />,
    description: "Embracing change and quickly adjusting to new circumstances with flexibility and resilience.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "Creativity",
    icon: <LightbulbIcon size={24} />,
    description: "Generating original ideas and approaching challenges from unique perspectives.",
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Critical Thinking",
    icon: <Brain size={24} />,
    description: "Evaluating information objectively to form sound judgments and make reasoned decisions.",
    color: "from-teal-500 to-green-500",
  },
  {
    name: "Goal-Oriented",
    icon: <Target size={24} />,
    description: "Maintaining clear focus on objectives and persistently working toward achieving them.",
    color: "from-orange-500 to-amber-500",
  },
]

// Tools data
const tools = [
  { name: "VS Code", icon: "/vscode-logo.png" },
  { name: "Git", icon: "/git-logo.png" },
  { name: "GitHub", icon: "/github-logo.png" },
  { name: "Vercel", icon: "/vercel-logo.png" },
  { name: "Figma", icon: "/figma-logo.png" },
  { name: "npm", icon: "/npm-logo.png" },
]

type SkillCategory = "technical" | "soft" | "tools"

export default function UnifiedSkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("technical")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  // For the 3D tilt effect
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent, index: number) => {
      const card = cardRefs.current[index]
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    const handleMouseLeave = (index: number) => {
      const card = cardRefs.current[index]
      if (!card) return
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`
    }

    cardRefs.current.forEach((card, index) => {
      if (!card) return
      card.addEventListener("mousemove", (e) => handleMouseMove(e, index))
      card.addEventListener("mouseleave", () => handleMouseLeave(index))
    })

    return () => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return
        card.removeEventListener("mousemove", (e) => handleMouseMove(e, index))
        card.removeEventListener("mouseleave", () => handleMouseLeave(index))
      })
    }
  }, [activeCategory])

  // Reset refs when category changes
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, getActiveSkills().length)
  }, [activeCategory])

  const getActiveSkills = () => {
    switch (activeCategory) {
      case "technical":
        return technicalSkills
      case "soft":
        return softSkills
      case "tools":
        return tools
      default:
        return technicalSkills
    }
  }

  return (
    <section className="mb-20" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
      >
        My Skillset
      </motion.h2>

      <div className="relative">
        {/* Animated background elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-purple-900/5 via-transparent to-pink-900/5 rounded-3xl"></div>

        {/* Cosmic dust particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`skill-dust-${i}`}
            className="absolute rounded-full bg-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}

        {/* Main container with glass morphism effect */}
        <div className="relative rounded-3xl overflow-hidden backdrop-blur-sm">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-black/90 -z-10"></div>

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 4 + 1}px`,
                }}
                animate={{
                  y: [0, Math.random() * 100 - 50],
                  x: [0, Math.random() * 100 - 50],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap">
            <CategoryTab
              isActive={activeCategory === "technical"}
              onClick={() => setActiveCategory("technical")}
              icon={<Code size={16} className="sm:w-[18px] sm:h-[18px]" />}
              label="Technical Skills"
            />
            <CategoryTab
              isActive={activeCategory === "soft"}
              onClick={() => setActiveCategory("soft")}
              icon={<Users size={16} className="sm:w-[18px] sm:h-[18px]" />}
              label="Soft Skills"
            />
            <CategoryTab
              isActive={activeCategory === "tools"}
              onClick={() => setActiveCategory("tools")}
              icon={<Tool size={16} className="sm:w-[18px] sm:h-[18px]" />}
              label="Tools"
            />
          </div>

          {/* Content area */}
          <div className="p-8 md:p-12 bg-gradient-to-br from-gray-900/50 to-black/50">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Category description */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
                    {activeCategory === "technical" && "Professional Technical Skills"}
                    {activeCategory === "soft" && "Professional Soft Skills"}
                    {activeCategory === "tools" && "Tools I Use"}
                  </h3>
                  <p className="text-gray-300">
                    {activeCategory === "technical" &&
                      "My expertise in programming languages, frameworks, and technologies that I use to build robust applications."}
                    {activeCategory === "soft" &&
                      "The interpersonal and personal attributes that enable me to work effectively and harmoniously with others."}
                    {activeCategory === "tools" &&
                      "The software and development tools I use daily to streamline my workflow and enhance productivity."}
                  </p>
                </div>

                {/* Skills grid */}
                <div
                  className={`grid gap-4 sm:gap-6 ${
                    activeCategory === "technical"
                      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                      : activeCategory === "soft"
                        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                        : "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6"
                  }`}
                >
                  {getActiveSkills().map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="relative"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      ref={(el) => (cardRefs.current[index] = el)}
                    >
                      {activeCategory === "technical" && (
                        <TechnicalSkillCard
                          skill={skill as (typeof technicalSkills)[0]}
                          isHovered={hoveredSkill === skill.name}
                          index={index}
                        />
                      )}
                      {activeCategory === "soft" && (
                        <SoftSkillCard
                          skill={skill as (typeof softSkills)[0]}
                          isHovered={hoveredSkill === skill.name}
                          index={index}
                        />
                      )}
                      {activeCategory === "tools" && (
                        <ToolCard
                          skill={skill as (typeof tools)[0]}
                          isHovered={hoveredSkill === skill.name}
                          index={index}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

interface CategoryTabProps {
  isActive: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}

function CategoryTab({ isActive, onClick, icon, label }: CategoryTabProps) {
  return (
    <button
      onClick={onClick}
      className={`relative flex-1 py-3 sm:py-4 px-2 sm:px-4 text-center transition-all duration-300 overflow-hidden ${
        isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="activeTabBg"
          className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30 -z-10"
        />
      )}
      <div className="flex items-center justify-center gap-1 sm:gap-2">
        <span className={`transition-colors duration-300 ${isActive ? "text-purple-400" : ""}`}>{icon}</span>
        <span className="font-medium text-sm sm:text-base">{label}</span>
      </div>
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"
          style={{ borderRadius: "0" }}
        />
      )}
    </button>
  )
}

interface TechnicalSkillCardProps {
  skill: {
    name: string
    icon: string
    category: string
  }
  isHovered: boolean
  index: number
}

function TechnicalSkillCard({ skill, isHovered, index }: TechnicalSkillCardProps) {
  return (
    <div
      className={`h-full rounded-2xl transition-all duration-500 overflow-hidden group ${
        isHovered
          ? "bg-gradient-to-br from-purple-900/40 to-pink-900/40 shadow-lg shadow-purple-500/20 scale-105"
          : "bg-gradient-to-br from-purple-900/20 to-pink-900/20 shadow-md"
      }`}
      style={{
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="relative h-full p-6 flex flex-col items-center text-center z-10">
        {/* Animated background element */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: {
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scale: {
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            },
          }}
          className="absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 blur-xl -z-10"
        />

        <div
          className={`relative w-16 h-16 mb-4 transition-all duration-500 ${
            isHovered ? "scale-110 transform-gpu" : ""
          }`}
        >
          {/* Glow effect - always visible but stronger on hover */}
          <div
            className={`absolute inset-0 rounded-full blur-md bg-gradient-to-r from-purple-500/20 to-pink-500/20 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-50"
            }`}
          />

          {/* Icon */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <Image
              src={skill.icon || "/placeholder.svg"}
              alt={skill.name}
              width={48}
              height={48}
              className={`object-contain drop-shadow-lg transition-all duration-500 ${isHovered ? "scale-110" : ""}`}
            />
          </div>

          {/* Sparkles on hover */}
          {isHovered && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -top-1 -right-1 text-yellow-400"
              >
                <Sparkles size={12} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -bottom-1 -left-1 text-yellow-400"
              >
                <Sparkles size={12} />
              </motion.div>
            </>
          )}
        </div>

        <h3
          className={`font-medium transition-all duration-300 text-transparent bg-clip-text bg-gradient-to-r ${
            isHovered ? "from-purple-400 to-pink-500" : "from-purple-300 to-pink-400"
          }`}
        >
          {skill.name}
        </h3>

        <div
          className={`mt-2 px-3 py-1 text-xs rounded-full transition-all duration-300 ${
            isHovered
              ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white"
              : "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-gray-200"
          }`}
        >
          {skill.category}
        </div>

        {/* Animated border on hover */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          style={{
            background: "linear-gradient(90deg, rgba(168,85,247,0.4) 0%, rgba(236,72,153,0.4) 100%) border-box",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            borderRadius: "1rem",
            border: "2px solid transparent",
            padding: "1px",
          }}
        />
      </div>
    </div>
  )
}

interface SoftSkillCardProps {
  skill: {
    name: string
    icon: React.ReactNode
    description: string
    color: string
  }
  isHovered: boolean
  index: number
}

function SoftSkillCard({ skill, isHovered, index }: SoftSkillCardProps) {
  return (
    <div
      className={`h-full rounded-2xl transition-all duration-500 overflow-hidden group ${
        isHovered ? "shadow-xl shadow-purple-500/20 scale-105 z-10" : "shadow-lg shadow-purple-500/5"
      }`}
      style={{
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Glass background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-black/80 -z-10" />

      {/* Animated gradient border */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
        style={{
          background: `linear-gradient(90deg, ${
            skill.color.includes("from-") ? skill.color.split("from-")[1].split(" ")[0] : "rgba(168,85,247,0.4)"
          } 0%, ${
            skill.color.includes("to-") ? skill.color.split("to-")[1].split(" ")[0] : "rgba(236,72,153,0.4)"
          } 100%) border-box`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          borderRadius: "1rem",
          border: "2px solid transparent",
          padding: "1px",
        }}
      />

      {/* Animated background glow */}
      <motion.div
        animate={{
          opacity: isHovered ? [0.3, 0.6, 0.3] : 0.1,
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className={`absolute inset-0 bg-gradient-to-br ${skill.color} -z-5`}
      />

      <div className="relative h-full p-6 flex flex-col z-10">
        {/* Header with icon and title */}
        <div className="flex items-center mb-4">
          <motion.div
            animate={
              isHovered
                ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
              repeatType: "reverse",
            }}
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${skill.color} flex items-center justify-center mr-4 transition-all duration-300 shadow-lg ${
              isHovered ? "shadow-purple-500/30" : "shadow-purple-500/10"
            }`}
          >
            <div className="text-white">{skill.icon}</div>
          </motion.div>

          <div>
            <h3
              className={`font-semibold text-lg transition-all duration-300 text-transparent bg-clip-text bg-gradient-to-r ${
                isHovered ? skill.color : "from-white to-gray-300"
              }`}
            >
              {skill.name}
            </h3>
          </div>
        </div>

        {/* Description with subtle animation on hover */}
        <motion.p
          animate={isHovered ? { y: [0, -2, 0] } : {}}
          transition={{ duration: 2, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
          className={`text-sm flex-grow transition-all duration-300 ${isHovered ? "text-white" : "text-gray-300"}`}
        >
          {skill.description}
        </motion.p>

        {/* Floating particles on hover */}
        {isHovered && (
          <>
            {[1, 2, 3].map((particle) => (
              <motion.div
                key={`particle-${particle}`}
                initial={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  x: [0, (particle - 2) * 15],
                  y: [-5, -20 - particle * 5],
                  scale: [0, 0.8, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: particle * 0.3,
                }}
                className={`absolute bottom-6 right-6 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${skill.color}`}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

interface ToolCardProps {
  skill: {
    name: string
    icon: string
  }
  isHovered: boolean
  index: number
}

function ToolCard({ skill, isHovered, index }: ToolCardProps) {
  return (
    <div
      className={`h-full rounded-xl border transition-all duration-300 overflow-hidden ${
        isHovered
          ? "border-purple-500/50 shadow-lg shadow-purple-500/10"
          : "border-purple-500/20 shadow-md shadow-purple-500/5"
      }`}
    >
      {/* Background gradient that's always visible but intensifies on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-70"
        }`}
      />

      <div className="relative h-full p-4 flex flex-col items-center text-center z-10">
        {/* Animated background element */}
        <motion.div
          animate={{
            x: [0, 5, -5, 0],
            y: [0, -5, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 0.5,
          }}
          className="absolute top-0 right-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-md -z-10"
        />

        <div
          className={`relative w-16 h-16 mb-3 transition-all duration-500 ${
            isHovered ? "scale-110 transform-gpu" : ""
          }`}
        >
          {/* Glow effect - always visible but stronger on hover */}
          <div
            className={`absolute inset-0 rounded-full blur-md bg-gradient-to-r from-purple-500/20 to-pink-500/20 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-50"
            }`}
          />

          {/* Rotating ring - always visible */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-purple-500/10 border-t-purple-500/30 border-r-pink-500/30"
          />

          {/* Icon */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <Image
              src={skill.icon || "/placeholder.svg"}
              alt={skill.name}
              width={40}
              height={40}
              className="object-contain drop-shadow-lg"
            />
          </div>
        </div>

        <h3
          className={`text-sm font-medium transition-all duration-300 text-transparent bg-clip-text bg-gradient-to-r ${
            isHovered ? "from-purple-400 to-pink-500" : "from-purple-300 to-pink-400"
          }`}
        >
          {skill.name}
        </h3>
      </div>
    </div>
  )
}
