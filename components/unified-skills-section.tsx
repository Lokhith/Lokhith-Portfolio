"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import {
  Users,
  MessageSquare,
  LightbulbIcon,
  Clock,
  Target,
  Puzzle,
  Brain,
  Workflow,
  Code,
  PenToolIcon as Tool,
  Sparkles,
} from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

// Technical skills data
const technicalSkills = [
  {
    name: "JavaScript",
    icon: "/javascript-logo.png",
    color: "#F7DF1E",
    category: "language",
  },
  {
    name: "Python",
    icon: "/python-logo.png",
    color: "#3776AB",
    category: "language",
  },
  {
    name: "C++",
    icon: "/cpp-logo.png",
    color: "#00599C",
    category: "language",
  },
  {
    name: "C",
    icon: "/c-logo.png",
    color: "#A8B9CC",
    category: "language",
  },
  {
    name: "React",
    icon: "/react-logo.png",
    color: "#61DAFB",
    category: "frontend",
  },
  {
    name: "Node.js",
    icon: "/nodejs-logo.png",
    color: "#339933",
    category: "backend",
  },
  {
    name: "MongoDB",
    icon: "/mongodb-logo.png",
    color: "#47A248",
    category: "database",
  },
  {
    name: "Express",
    icon: "/express-logo.png",
    color: "#000000",
    category: "backend",
  },
  {
    name: "Next.js",
    icon: "/nextjs-logo.png",
    color: "#000000",
    category: "frontend",
  },
  {
    name: "TypeScript",
    icon: "/typescript-logo.png",
    color: "#3178C6",
    category: "language",
  },
  {
    name: "HTML5",
    icon: "/html5-logo.png",
    color: "#E34F26",
    category: "frontend",
  },
  {
    name: "CSS3",
    icon: "/css3-logo.png",
    color: "#1572B6",
    category: "frontend",
  },
  {
    name: "Tailwind CSS",
    icon: "/tailwindcss-logo.png",
    color: "#06B6D4",
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
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
  },
  {
    name: "Communication",
    icon: <MessageSquare size={24} />,
    description: "Articulating ideas clearly and listening actively to ensure effective information exchange.",
    color: "from-blue-500 to-cyan-500",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
  },
  {
    name: "Problem Solving",
    icon: <Puzzle size={24} />,
    description: "Analyzing challenges methodically and developing innovative solutions with a strategic approach.",
    color: "from-amber-500 to-red-500",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
  },
  {
    name: "Time Management",
    icon: <Clock size={24} />,
    description: "Prioritizing tasks effectively to maximize productivity and meet deadlines consistently.",
    color: "from-green-500 to-emerald-500",
    gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
  },
  {
    name: "Adaptability",
    icon: <Workflow size={24} />,
    description: "Embracing change and quickly adjusting to new circumstances with flexibility and resilience.",
    color: "from-indigo-500 to-purple-500",
    gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  },
  {
    name: "Creativity",
    icon: <LightbulbIcon size={24} />,
    description: "Generating original ideas and approaching challenges from unique perspectives.",
    color: "from-pink-500 to-rose-500",
    gradient: "linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)",
  },
  {
    name: "Critical Thinking",
    icon: <Brain size={24} />,
    description: "Evaluating information objectively to form sound judgments and make reasoned decisions.",
    color: "from-teal-500 to-green-500",
    gradient: "linear-gradient(135deg, #14B8A6 0%, #10B981 100%)",
  },
  {
    name: "Goal-Oriented",
    icon: <Target size={24} />,
    description: "Maintaining clear focus on objectives and persistently working toward achieving them.",
    color: "from-orange-500 to-amber-500",
    gradient: "linear-gradient(135deg, #F97316 0%, #F59E0B 100%)",
  },
]

// Tools data
const tools = [
  {
    name: "VS Code",
    icon: "/vscode-logo.png",
    color: "#007ACC",
    description: "My primary code editor with powerful extensions and customizations.",
  },
  {
    name: "Git",
    icon: "/git-logo.png",
    color: "#F05032",
    description: "Version control system for tracking changes and collaborating.",
  },
  {
    name: "GitHub",
    icon: "/github-logo.png",
    color: "#181717",
    description: "Platform for hosting and collaborating on code repositories.",
  },
  {
    name: "Vercel",
    icon: "/vercel-logo.png",
    color: "#000000",
    description: "Deployment platform for frontend projects with serverless functions.",
  },
  {
    name: "Figma",
    icon: "/figma-logo.png",
    color: "#F24E1E",
    description: "Design tool for creating UI/UX mockups and prototypes.",
  },
  {
    name: "npm",
    icon: "/npm-logo.png",
    color: "#CB3837",
    description: "Package manager for JavaScript libraries and dependencies.",
  },
]

type SkillCategory = "technical" | "soft" | "tools"

export default function UnifiedSkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("technical")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const backgroundControls = useAnimation()
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  // Animate background when tab changes
  useEffect(() => {
    backgroundControls.start({
      background:
        activeCategory === "technical"
          ? "radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.08) 0%, rgba(0, 0, 0, 0) 70%)"
          : activeCategory === "soft"
            ? "radial-gradient(circle at 70% 60%, rgba(236, 72, 153, 0.08) 0%, rgba(0, 0, 0, 0) 70%)"
            : "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, rgba(0, 0, 0, 0) 70%)",
      transition: { duration: 1.5 },
    })
  }, [activeCategory, backgroundControls])

  // Mouse move effect for container
  useEffect(() => {
    if (!containerRef.current || isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current
      if (!container) return

      const { left, top, width, height } = container.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      // Subtle parallax effect
      const elements = container.querySelectorAll(".parallax-element")
      elements.forEach((el) => {
        const speed = Number.parseFloat(el.getAttribute("data-speed") || "1")
        const htmlEl = el as HTMLElement
        htmlEl.style.transform = `translate(${x * 10 * speed}px, ${y * 10 * speed}px)`
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isMobile])

  // Get icon component based on category
  const getCategoryIcon = (category: SkillCategory) => {
    switch (category) {
      case "technical":
        return <Code size={isMobile ? 16 : 20} />
      case "soft":
        return <Users size={isMobile ? 16 : 20} />
      case "tools":
        return <Tool size={isMobile ? 16 : 20} />
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

      {/* Enhanced Tab Navigation */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex rounded-xl p-1.5 bg-gray-800/70 backdrop-blur-md border border-gray-700 shadow-lg shadow-purple-900/10">
          {[
            { id: "technical", label: "Technical Skills" },
            { id: "soft", label: "Soft Skills" },
            { id: "tools", label: "Tools" },
          ].map((item) => (
            <TabButton
              key={item.id}
              isActive={activeCategory === item.id}
              onClick={() => setActiveCategory(item.id as SkillCategory)}
              label={item.label}
              icon={getCategoryIcon(item.id as SkillCategory)}
            />
          ))}
        </div>
      </div>

      {/* Content Area with Enhanced Animation */}
      <div className="relative" ref={containerRef}>
        {/* Animated background elements */}
        <motion.div className="absolute inset-0 rounded-3xl" animate={backgroundControls} />

        <div
          className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl parallax-element"
          data-speed="2"
        ></div>
        <div
          className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-600/10 rounded-full blur-3xl parallax-element"
          data-speed="1.5"
        ></div>

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white/10 parallax-element"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            data-speed={Math.random() * 3 + 1}
          />
        ))}

        <div className="relative p-6 sm:p-8 rounded-3xl bg-gray-900/60 backdrop-blur-md border border-gray-800/80 shadow-xl shadow-purple-900/10 overflow-hidden">
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />

            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.05, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
              }}
            />
          </div>

          <AnimatePresence mode="wait">
            {activeCategory === "technical" && (
              <motion.div
                key="technical"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="min-h-[300px]"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
                  {technicalSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      whileHover={{ y: -8, scale: 1.05, zIndex: 10 }}
                      className="group relative"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="relative flex flex-col items-center p-3 sm:p-4 rounded-xl transition-all duration-300 overflow-hidden">
                        {/* Background with conditional animation */}
                        <div className="absolute inset-0 bg-gray-800/80 rounded-xl border border-gray-700 group-hover:border-purple-500/50 transition-colors duration-300" />

                        {/* Hover glow effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                          animate={
                            hoveredSkill === skill.name
                              ? {
                                  scale: [1, 1.2, 1],
                                  opacity: [0, 0.2, 0],
                                }
                              : {}
                          }
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                          }}
                        />

                        {/* Icon container with enhanced effects */}
                        <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 mb-3 flex items-center justify-center">
                          {/* Rotating ring */}
                          <motion.div
                            className="absolute inset-0 rounded-full border border-gray-600 group-hover:border-purple-500/30 opacity-0 group-hover:opacity-100 transition-all duration-300"
                            style={{ borderTopColor: skill.color + "80", borderRightColor: skill.color + "40" }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />

                          {/* Pulsing background */}
                          <motion.div
                            className="absolute inset-1 rounded-full bg-gray-900/80 group-hover:bg-gray-900/60"
                            animate={
                              hoveredSkill === skill.name
                                ? {
                                    scale: [1, 1.1, 1],
                                  }
                                : {}
                            }
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                            }}
                          />

                          {/* Icon */}
                          <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
                            <Image
                              src={skill.icon || "/placeholder.svg"}
                              alt={skill.name}
                              width={32}
                              height={32}
                              className="object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        </div>

                        {/* Skill name with animated underline */}
                        <div className="relative z-10 text-center">
                          <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                            {skill.name}
                          </span>
                          <motion.div
                            className="h-0.5 w-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-1 group-hover:w-full transition-all duration-300"
                            initial={{ width: 0 }}
                            animate={hoveredSkill === skill.name ? { width: "100%" } : { width: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>

                        {/* Floating particles on hover */}
                        {hoveredSkill === skill.name && (
                          <>
                            {[1, 2, 3].map((particle) => (
                              <motion.div
                                key={`tech-particle-${skill.name}-${particle}`}
                                className="absolute w-1 h-1 rounded-full bg-purple-400/80"
                                initial={{
                                  x: 0,
                                  y: 0,
                                  opacity: 0,
                                  scale: 0,
                                }}
                                animate={{
                                  x: [0, (Math.random() - 0.5) * 30],
                                  y: [0, -20 - Math.random() * 10],
                                  opacity: [0, 0.8, 0],
                                  scale: [0, Math.random() * 0.8 + 0.2, 0],
                                }}
                                transition={{
                                  duration: 1 + Math.random(),
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: particle * 0.2,
                                }}
                                style={{
                                  left: `${50 + (Math.random() - 0.5) * 20}%`,
                                  bottom: "20%",
                                }}
                              />
                            ))}
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeCategory === "soft" && (
              <motion.div
                key="soft"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="min-h-[300px]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {softSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -8, scale: 1.02, zIndex: 10 }}
                      className="group"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="relative h-full rounded-xl overflow-hidden perspective-1000">
                        {/* Card background with gradient border */}
                        <div className="absolute inset-0 rounded-xl">
                          <div className="absolute inset-0 bg-gray-800/80 backdrop-blur-sm" />

                          {/* Animated gradient border */}
                          <div
                            className={`absolute inset-0 transition-opacity duration-500 ${hoveredSkill === skill.name ? "opacity-100" : "opacity-0"}`}
                            style={{
                              background: `${skill.gradient} border-box`,
                              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                              WebkitMaskComposite: "xor",
                              maskComposite: "exclude",
                              borderRadius: "0.75rem",
                              border: "2px solid transparent",
                              padding: "1px",
                            }}
                          />
                        </div>

                        {/* Card content */}
                        <div className="relative h-full p-5 sm:p-6 z-10">
                          <div className="flex items-center mb-4">
                            {/* Animated icon */}
                            <motion.div
                              className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-lg`}
                              style={{ background: skill.gradient }}
                              animate={
                                hoveredSkill === skill.name
                                  ? {
                                      scale: [1, 1.1, 1],
                                      rotate: [0, 5, -5, 0],
                                    }
                                  : {}
                              }
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                              }}
                            >
                              <div className="text-white">{skill.icon}</div>

                              {/* Radiating rings on hover */}
                              {hoveredSkill === skill.name && (
                                <>
                                  {[1, 2].map((ring) => (
                                    <motion.div
                                      key={`ring-${skill.name}-${ring}`}
                                      className="absolute inset-0 rounded-full"
                                      style={{
                                        background: skill.gradient,
                                        opacity: 0.2 / ring,
                                      }}
                                      initial={{ scale: 1 }}
                                      animate={{ scale: 1 + ring * 0.4 }}
                                      transition={{
                                        duration: 1.5,
                                        repeat: Number.POSITIVE_INFINITY,
                                        delay: ring * 0.5,
                                      }}
                                    />
                                  ))}
                                </>
                              )}
                            </motion.div>

                            {/* Skill name with gradient text */}
                            <h3
                              className={`font-semibold text-lg transition-all duration-300 text-transparent bg-clip-text`}
                              style={{
                                backgroundImage:
                                  hoveredSkill === skill.name
                                    ? skill.gradient
                                    : "linear-gradient(to right, white, #d1d5db)",
                              }}
                            >
                              {skill.name}
                            </h3>
                          </div>

                          {/* Description with subtle animation */}
                          <motion.p
                            className={`text-sm transition-all duration-300 ${hoveredSkill === skill.name ? "text-white" : "text-gray-300"}`}
                            animate={hoveredSkill === skill.name ? { y: [0, -2, 0] } : {}}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                            }}
                          >
                            {skill.description}
                          </motion.p>

                          {/* Floating particles on hover */}
                          {hoveredSkill === skill.name && (
                            <>
                              {[1, 2, 3, 4].map((particle) => (
                                <motion.div
                                  key={`soft-particle-${skill.name}-${particle}`}
                                  className="absolute w-1.5 h-1.5 rounded-full"
                                  style={{
                                    background: skill.gradient,
                                    left: `${Math.random() * 100}%`,
                                    bottom: `${Math.random() * 20}%`,
                                  }}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{
                                    opacity: [0, 0.7, 0],
                                    scale: [0, 1, 0],
                                    y: [-5, -20 - particle * 5],
                                    x: [(Math.random() - 0.5) * 20],
                                  }}
                                  transition={{
                                    duration: 1.5 + Math.random(),
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: particle * 0.3,
                                  }}
                                />
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeCategory === "tools" && (
              <motion.div
                key="tools"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="min-h-[300px]"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
                  {tools.map((tool, index) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -8, scale: 1.05, zIndex: 10 }}
                      className="group"
                      onMouseEnter={() => setHoveredSkill(tool.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="relative h-full rounded-xl overflow-hidden">
                        {/* Card background with hover effects */}
                        <div className="absolute inset-0">
                          <div className="absolute inset-0 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 group-hover:border-blue-500/30 transition-colors duration-300" />

                          {/* Animated glow on hover */}
                          <motion.div
                            className="absolute inset-0 bg-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                            animate={
                              hoveredSkill === tool.name
                                ? {
                                    scale: [1, 1.2, 1],
                                  }
                                : {}
                            }
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                            }}
                          />
                        </div>

                        {/* Card content */}
                        <div className="relative h-full p-5 sm:p-6 flex flex-col items-center text-center z-10">
                          {/* Icon container with enhanced effects */}
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4">
                            {/* Rotating rings */}
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 border-blue-500/10"
                              style={{
                                borderTopColor: `${tool.color}40`,
                                borderRightColor: `${tool.color}20`,
                              }}
                              animate={{ rotate: 360 }}
                              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />

                            <motion.div
                              className="absolute inset-2 rounded-full border border-blue-500/5"
                              style={{
                                borderBottomColor: `${tool.color}30`,
                                borderLeftColor: `${tool.color}10`,
                              }}
                              animate={{ rotate: -360 }}
                              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />

                            {/* Pulsing background */}
                            <motion.div
                              className="absolute inset-3 rounded-full bg-gray-900/90"
                              animate={
                                hoveredSkill === tool.name
                                  ? {
                                      scale: [1, 1.1, 1],
                                    }
                                  : {}
                              }
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                              }}
                            />

                            {/* Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                                <Image
                                  src={tool.icon || "/placeholder.svg"}
                                  alt={tool.name}
                                  width={48}
                                  height={48}
                                  className="object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                                />
                              </div>
                            </div>

                            {/* Sparkle effect on hover */}
                            {hoveredSkill === tool.name && (
                              <motion.div
                                className="absolute -right-1 -top-1 text-yellow-400"
                                initial={{ scale: 0, rotate: 0 }}
                                animate={{ scale: [0, 1.2, 1], rotate: [0, 20] }}
                                transition={{ duration: 0.5 }}
                              >
                                <Sparkles size={16} />
                              </motion.div>
                            )}
                          </div>

                          {/* Tool name with animated underline */}
                          <div className="mb-2">
                            <h3 className="text-base sm:text-lg font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
                              {tool.name}
                            </h3>
                            <motion.div
                              className="h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mt-1"
                              initial={{ width: 0 }}
                              animate={hoveredSkill === tool.name ? { width: "80%" } : { width: 0 }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>

                          {/* Description with fade-in effect */}
                          <motion.p
                            className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mt-1"
                            initial={{ opacity: 0, height: 0 }}
                            animate={
                              hoveredSkill === tool.name ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }
                            }
                            transition={{ duration: 0.3 }}
                          >
                            {tool.description}
                          </motion.p>

                          {/* Floating particles on hover */}
                          {hoveredSkill === tool.name && (
                            <>
                              {[1, 2, 3].map((particle) => (
                                <motion.div
                                  key={`tool-particle-${tool.name}-${particle}`}
                                  className="absolute w-1 h-1 rounded-full bg-blue-400/80"
                                  initial={{
                                    x: 0,
                                    y: 0,
                                    opacity: 0,
                                    scale: 0,
                                  }}
                                  animate={{
                                    x: [0, (Math.random() - 0.5) * 30],
                                    y: [0, -20 - Math.random() * 10],
                                    opacity: [0, 0.8, 0],
                                    scale: [0, Math.random() * 0.8 + 0.2, 0],
                                  }}
                                  transition={{
                                    duration: 1 + Math.random(),
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: particle * 0.2,
                                  }}
                                  style={{
                                    left: `${50 + (Math.random() - 0.5) * 20}%`,
                                    bottom: "20%",
                                  }}
                                />
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

interface TabButtonProps {
  isActive: boolean
  onClick: () => void
  label: string
  icon?: React.ReactNode
}

function TabButton({ isActive, onClick, label, icon }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
        isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="activeSkillTab"
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg -z-10"
          transition={{ type: "spring", duration: 0.6 }}
        >
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-sm" />

          {/* Animated particles */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`tab-particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-white/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, (Math.random() - 0.5) * 20],
                y: [0, (Math.random() - 0.5) * 20],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      )}

      <div className="flex items-center justify-center gap-1.5">
        {icon && (
          <span
            className={`transition-transform duration-300 ${isActive ? "text-white" : "text-gray-400"} ${isActive ? "scale-110" : ""}`}
          >
            {icon}
          </span>
        )}
        <span>{label}</span>
      </div>

      {/* Subtle hover effect for inactive tabs */}
      {!isActive && (
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gray-600 rounded-full"
          initial={{ width: 0 }}
          whileHover={{ width: "50%" }}
          transition={{ duration: 0.3 }}
        />
      )}
    </button>
  )
}
