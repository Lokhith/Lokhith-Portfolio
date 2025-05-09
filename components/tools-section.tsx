"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { useState } from "react"

const tools = [
  { name: "VS Code", icon: "/vscode-logo.png" },
  { name: "Git", icon: "/git-logo.png" },
  { name: "GitHub", icon: "/github-logo.png" },
  { name: "Vercel", icon: "/vercel-logo.png" },
  { name: "Figma", icon: "/figma-logo.png" },
  { name: "npm", icon: "/npm-logo.png" },
]

export default function ToolsSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [hoveredTool, setHoveredTool] = useState<string | null>(null)

  return (
    <section className="mb-20" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
      >
        Tools I Use
      </motion.h2>

      <div className="relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/5 to-purple-900/5 rounded-3xl"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl"></div>

        {/* Main content */}
        <div className="relative py-16 px-4">
          <motion.div
            className="flex justify-center items-center"
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
            <div className="relative">
              {/* Center circle */}
              <motion.div
                className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center z-10 relative"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1, rotate: 360 } : { scale: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div className="w-28 h-28 rounded-full bg-black flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Tools</span>
                </div>
              </motion.div>

              {/* Orbiting tools */}
              {tools.map((tool, index) => {
                const angle = (index * (360 / tools.length) * Math.PI) / 180
                const radius = 180 // Distance from center
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius

                return (
                  <motion.div
                    key={tool.name}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: "50%", top: "50%" }}
                    variants={{
                      hidden: { x: 0, y: 0, opacity: 0 },
                      visible: {
                        x: x,
                        y: y,
                        opacity: 1,
                        transition: {
                          duration: 0.8,
                          ease: "easeOut",
                        },
                      },
                    }}
                    whileHover={{ scale: 1.2, zIndex: 20 }}
                    onMouseEnter={() => setHoveredTool(tool.name)}
                    onMouseLeave={() => setHoveredTool(null)}
                  >
                    <div className="relative group">
                      {/* Glowing effect */}
                      <div
                        className={`absolute -inset-4 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                          hoveredTool === tool.name ? "opacity-100" : ""
                        }`}
                      ></div>

                      {/* Tool icon */}
                      <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-gray-900/90 to-black/90 p-0.5">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                          <div className="relative w-10 h-10">
                            <Image
                              src={tool.icon || "/placeholder.svg"}
                              alt={tool.name}
                              fill
                              className="object-contain drop-shadow-lg"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Tool name */}
                      <motion.div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-1 rounded-full"
                        initial={{ opacity: 0, y: -10 }}
                        animate={hoveredTool === tool.name ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-white text-sm whitespace-nowrap">{tool.name}</span>
                      </motion.div>
                    </div>
                  </motion.div>
                )
              })}

              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full z-0" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="toolLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <g>
                  {tools.map((tool, index) => {
                    const angle = (index * (360 / tools.length) * Math.PI) / 180
                    const radius = 180
                    const x = Math.cos(angle) * radius
                    const y = Math.sin(angle) * radius

                    return (
                      <motion.line
                        key={`line-${tool.name}`}
                        x1="50%"
                        y1="50%"
                        x2={`calc(50% + ${x}px)`}
                        y2={`calc(50% + ${y}px)`}
                        stroke="url(#toolLineGradient)"
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    )
                  })}
                </g>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
