"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Users, MessageSquare, LightbulbIcon, Clock, Target, Puzzle, Brain, Workflow } from "lucide-react"

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

export default function SoftSkillsSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [activeSkill, setActiveSkill] = useState<string | null>(null)

  return (
    <section className="mb-20" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
      >
        Soft Skills & Attributes
      </motion.h2>

      <div className="relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 to-pink-900/5 rounded-3xl"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-600/10 rounded-full blur-3xl"></div>

        {/* Main content */}
        <div className="relative py-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {softSkills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={index}
                inView={inView}
                isActive={activeSkill === skill.name}
                setActiveSkill={setActiveSkill}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface SkillCardProps {
  skill: {
    name: string
    icon: React.ReactNode
    description: string
    color: string
  }
  index: number
  inView: boolean
  isActive: boolean
  setActiveSkill: (name: string | null) => void
}

function SkillCard({ skill, index, inView, isActive, setActiveSkill }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setActiveSkill(skill.name)}
      onMouseLeave={() => setActiveSkill(null)}
    >
      <div className={`h-full rounded-xl overflow-hidden perspective-1000`}>
        <motion.div
          className="relative h-full w-full transition-all duration-500 preserve-3d"
          animate={{
            rotateY: isActive ? 180 : 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Front of card */}
          <div className="absolute inset-0 backface-hidden">
            <div className="h-full p-6 rounded-xl border border-gray-800 bg-gray-900/70 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 flex flex-col items-center justify-center text-center">
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${skill.color} bg-opacity-20 flex items-center justify-center mb-4`}
              >
                <div className="text-white">{skill.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{skill.name}</h3>

              <div className="mt-2 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 opacity-50">
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 10l5 5 5-5"></path>
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Back of card */}
          <div className="absolute inset-0 backface-hidden rotate-y-180">
            <div className="h-full p-6 rounded-xl border border-gray-800 bg-gray-900/70 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 flex flex-col items-center justify-center text-center">
              <p className="text-gray-300">{skill.description}</p>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 opacity-50">
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 10l5 5 5-5"></path>
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
