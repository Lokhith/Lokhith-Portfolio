"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Github, ExternalLink, Code, Layers, Users, Zap, Filter, X } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { useMediaQuery } from "@/hooks/use-media-query"

const projects = [
  {
    id: 1,
    title: "Pick&Fit",
    description: "An innovative online shopping platform that bridges the gap between online and offline shopping.",
    longDescription:
      "Pick&Fit revolutionizes the online shopping experience by allowing users to order products, try them physically at home, and decide to purchase or return them, ensuring a perfect fit every time. Future enhancements include a virtual try-on feature for a complete digital shopping experience.",
    image: "/home-page.png",
    tags: ["Next.js", "Tailwind CSS"],
    githubLink: "https://github.com/Lokhith/pick-and-fit",
    demoLink: "https://pick-and-fit.vercel.app",
    highlights: [
      "Home try-on with hassle-free returns",
      "Personalized size recommendations",
      "Secure payment processing",
      "Real-time order tracking",
    ],
    color: "from-purple-500 to-pink-500",
    category: "frontend",
  },
  {
    id: 2,
    title: "TurfLink",
    description: "A dedicated sports platform designed to connect athletes and sports enthusiasts.",
    longDescription:
      "TurfLink offers a range of services, including turf booking, player matching, and event management, creating a seamless experience for anyone looking to stay active and competitive. The platform helps users find nearby sports facilities, join teams, and participate in local tournaments.",
    image: "/turflink-screenshot.jpeg", // Changed from "/sports-analytics-dashboard.png"
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
    githubLink: "https://github.com/Lokhith/Turf_Link",
    demoLink: "https://turflink.vercel.app",
    highlights: [
      "Real-time turf availability and booking",
      "Player matching based on skill level",
      "Tournament organization tools",
      "Community forums and event calendars",
    ],
    color: "from-emerald-500 to-cyan-500",
    category: "fullstack",
  },
  {
    id: 3,
    title: "Golfgear",
    description:
      "A premium e-commerce platform dedicated to golfers, featuring a curated selection of high-quality golf equipment.",
    longDescription:
      "Golfgear offers a curated selection of high-quality golf clubs, accessories, and apparel. It includes advanced filtering, personalized recommendations, and a seamless shopping experience for golf enthusiasts. The platform also features expert reviews, product comparisons, and maintenance guides.",
    image: "/golf-ecommerce-screenshot.png",
    tags: ["Next.js", "Tailwind CSS"],
    githubLink: "https://github.com/Lokhith/Golf-ecommerce",
    demoLink: "https://golf-ecommerce-tau.vercel.app/",
    highlights: [
      "Advanced product filtering and search",
      "Personalized equipment recommendations",
      "Secure checkout with multiple payment options",
      "Expert reviews and buying guides",
    ],
    color: "from-amber-500 to-red-500",
    category: "frontend",
  },
  {
    id: 4,
    title: "Food Delivery App",
    description: "Order Your Favorites - A React-based food delivery frontend with intuitive ordering interface.",
    longDescription:
      "This React-based food delivery frontend offers users a simple interface to browse food items and place orders. Designed with a clean and appealing layout, it mimics real-world delivery apps to provide a smooth user experience. It supports cart functionality and displays food item details elegantly.",
    image: "/food-delivery-screenshot.png",
    tags: ["React.js", "CSS"],
    githubLink: "https://github.com/Lokhith/Food_delivery",
    demoLink: "http://food-delivery-jade-rho.vercel.app/",
    highlights: [
      "Add-to-cart and order interface",
      "Dynamic rendering of food items",
      "Clean UI with category-based browsing",
      "Responsive design for all devices",
    ],
    color: "from-orange-500 to-red-500",
    category: "frontend",
  },
  {
    id: 5,
    title: "Codeverse",
    description: "Developer Stats Aggregator - A platform for developers to showcase their coding profiles and stats.",
    longDescription:
      "Codeverse is a platform for developers to link their coding profiles (e.g., LeetCode, CodeChef) and showcase their coding stats in one place. It aggregates and visualizes user performance and coding activity. A perfect tool for job seekers and recruiters to highlight consistent learning and growth.",
    image: "/codeverse-screenshot.png",
    tags: ["Next.js", "Tailwind CSS"],
    githubLink: "https://github.com/Lokhith/CodeVerse",
    demoLink: "https://codeverse-opal.vercel.app/",
    highlights: [
      "Link multiple coding platform accounts",
      "Fetch and display coding stats dynamically",
      "Clean dashboard-style presentation",
      "Future scope for comparison with peers",
    ],
    color: "from-blue-500 to-purple-500",
    category: "frontend",
  },
]

export default function ProjectsShowcase() {
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [filterRef, filterInView] = useInView({ threshold: 0.1 })
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isSmallScreen = useMediaQuery("(max-width: 768px)")

  // Filter projects based on selected category
  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.category === selectedCategory)
    : projects

  // Close expanded project when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeProject !== null && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveProject(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeProject])

  return (
    <div className="relative" ref={containerRef}>
      {/* Mobile filter toggle */}
      <div className="md:hidden mb-8 flex justify-center">
        <motion.button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isFilterOpen ? <X size={18} /> : <Filter size={18} />}
          {isFilterOpen ? "Close Filters" : "Filter Projects"}
        </motion.button>
      </div>

      {/* Category filter */}
      <motion.div
        ref={filterRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          height: isFilterOpen || !isSmallScreen ? "auto" : "0px",
          marginBottom: isFilterOpen || !isSmallScreen ? "3rem" : "0",
        }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden md:overflow-visible"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-pink-900/10 rounded-xl blur-xl -z-10"></div>

        <div className="py-6 px-4 rounded-xl border border-purple-500/10 bg-black/20 backdrop-blur-sm">
          <h3 className="text-center text-lg font-medium text-white mb-4">Filter by Project Type</h3>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <motion.button
              onClick={() => setSelectedCategory(null)}
              className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 overflow-hidden ${
                selectedCategory === null
                  ? "text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedCategory === null && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 -z-10"
                  layoutId="activeFilter"
                />
              )}
              All Projects
            </motion.button>

            <motion.button
              onClick={() => setSelectedCategory("fullstack")}
              className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 overflow-hidden ${
                selectedCategory === "fullstack"
                  ? "text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedCategory === "fullstack" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 -z-10"
                  layoutId="activeFilter"
                />
              )}
              Full Stack Projects
            </motion.button>

            <motion.button
              onClick={() => setSelectedCategory("frontend")}
              className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 overflow-hidden ${
                selectedCategory === "frontend"
                  ? "text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedCategory === "frontend" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 -z-10"
                  layoutId="activeFilter"
                />
              )}
              Frontend Projects
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Project count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-8"
      >
        <p className="text-gray-400">
          Showing <span className="text-white font-medium">{filteredProjects.length}</span> of{" "}
          <span className="text-white font-medium">{projects.length}</span> projects
          {selectedCategory && (
            <>
              {" "}
              filtered by{" "}
              <span className="text-purple-400 font-medium">
                {selectedCategory === "fullstack" ? "Full Stack" : "Frontend"}
              </span>
            </>
          )}
        </p>
      </motion.div>

      {/* Projects grid - Updated for mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isActive={activeProject === project.id}
            setActiveProject={setActiveProject}
            containerRef={containerRef}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* No results message */}
      {filteredProjects.length === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
          <p className="text-gray-400 text-lg mb-4">No projects found with the selected filter.</p>
          <button
            onClick={() => setSelectedCategory(null)}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white"
          >
            Show All Projects
          </button>
        </motion.div>
      )}
    </div>
  )
}

interface ProjectCardProps {
  project: any
  index: number
  isActive: boolean
  setActiveProject: (id: number | null) => void
  containerRef: React.RefObject<HTMLDivElement>
  isMobile: boolean
}

function ProjectCard({ project, index, isActive, setActiveProject, containerRef, isMobile }: ProjectCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="group relative"
      >
        {/* Card */}
        <div
          className={`relative h-full overflow-hidden rounded-xl border border-gray-800 bg-gray-900/70 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 ${
            isActive ? "ring-2 ring-purple-500/50 border-purple-500/50" : ""
          }`}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-purple-900/30 to-pink-900/30"></div>

          {/* Project category badge */}
          <div className="absolute top-2 right-2 z-10">
            <span
              className={`px-2 py-1 text-[10px] sm:text-xs rounded-full font-medium ${
                project.category === "fullstack"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
              }`}
            >
              {project.category === "fullstack" ? "Full Stack" : "Frontend"}
            </span>
          </div>

          {/* Glowing corners */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-pink-500/20 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Image */}
          <div className="relative h-32 sm:h-48 w-full overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>

            {/* Floating tags - Simplified for mobile */}
            <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
              {project.tags.slice(0, isMobile ? 1 : 3).map((tag: string) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-1.5 py-0.5 text-[10px] sm:text-xs rounded-full bg-black/60 backdrop-blur-sm text-white border border-white/10"
                >
                  {tag}
                </motion.span>
              ))}
              {project.tags.length > (isMobile ? 1 : 3) && (
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="px-1.5 py-0.5 text-[10px] sm:text-xs rounded-full bg-black/60 backdrop-blur-sm text-white border border-white/10"
                >
                  +{project.tags.length - (isMobile ? 1 : 3)}
                </motion.span>
              )}
            </div>
          </div>

          {/* Content - Simplified for mobile */}
          <div className="p-3 sm:p-6">
            <motion.h3
              className="text-sm sm:text-xl font-bold mb-1 sm:mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600 transition-all duration-300"
              whileHover={{ x: 5 }}
            >
              {project.title}
            </motion.h3>
            <p className="text-xs sm:text-base text-gray-400 mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3">
              {project.description}
            </p>

            {/* Project highlights - Hidden on mobile */}
            <div className="hidden sm:block space-y-2 mb-6">
              {project.highlights.slice(0, 2).map((highlight: string, i: number) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                >
                  <div className="mt-1 text-purple-400">
                    <Zap size={14} />
                  </div>
                  <p className="text-sm text-gray-400">{highlight}</p>
                </motion.div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-2 sm:mt-0">
              <div className="flex gap-2 sm:gap-3">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors group/link"
                >
                  <Github size={isMobile ? 14 : 18} />
                  <span className="text-xs sm:text-sm relative overflow-hidden">
                    {isMobile ? "" : "Code"}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-600 transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </a>
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors group/link"
                >
                  <ExternalLink size={isMobile ? 14 : 18} />
                  <span className="text-xs sm:text-sm relative overflow-hidden">
                    {isMobile ? "" : "Demo"}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-600 transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </a>
              </div>
              <motion.button
                onClick={() => setActiveProject(isActive ? null : project.id)}
                className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 relative overflow-hidden group/more"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{isActive ? "Less" : "More"}</span>
                <motion.div
                  animate={{ rotate: isActive ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-3 h-3 sm:w-4 sm:h-4 relative z-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3 h-3 sm:w-4 sm:h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-600 transform scale-x-0 group-hover/more:scale-x-100 transition-transform duration-300 origin-left"></span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Expanded project details */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="col-span-2 sm:col-span-2 lg:col-span-3 overflow-hidden"
          >
            <div className="mt-4 mb-8 p-4 sm:p-8 rounded-xl bg-gradient-to-br from-gray-900/90 to-black/90 border border-purple-500/20 shadow-xl shadow-purple-500/5 relative overflow-hidden">
              {/* Background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl"></div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 relative z-10">
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
                  >
                    {project.title} - Project Details
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-sm sm:text-base text-gray-300 mb-6"
                  >
                    {project.longDescription}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-4 mb-6"
                  >
                    <h4 className="text-base sm:text-lg font-semibold text-white">Key Features</h4>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight: string, i: number) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 + 0.3 }}
                          className="flex items-start gap-2"
                        >
                          <div className="mt-1 text-purple-400">
                            <Zap size={isMobile ? 14 : 16} />
                          </div>
                          <p className="text-xs sm:text-base text-gray-300">{highlight}</p>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="space-y-4"
                  >
                    <h4 className="text-base sm:text-lg font-semibold text-white">Technologies Used</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.tags.map((tag: string, i: number) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.05 + 0.4 }}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30 text-xs sm:text-sm"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-48 sm:h-64 w-full overflow-hidden rounded-lg group"
                  >
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                    {/* Project title overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-4">
                      <h3 className="text-lg sm:text-xl font-bold text-white">{project.title}</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"></div>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="p-3 sm:p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-purple-500/30 transition-colors duration-300 group"
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <Code
                          size={isMobile ? 14 : 18}
                          className="text-purple-400 group-hover:scale-110 transition-transform duration-300"
                        />
                        <h5 className="font-medium text-white text-xs sm:text-base">Development</h5>
                      </div>
                      <p className="text-[10px] sm:text-sm text-gray-400">
                        Built with modern development practices including CI/CD, testing, and code quality tools.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="p-3 sm:p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-pink-500/30 transition-colors duration-300 group"
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <Layers
                          size={isMobile ? 14 : 18}
                          className="text-pink-400 group-hover:scale-110 transition-transform duration-300"
                        />
                        <h5 className="font-medium text-white text-xs sm:text-base">Architecture</h5>
                      </div>
                      <p className="text-[10px] sm:text-sm text-gray-400">
                        Designed with scalability in mind using microservices and modular components.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="p-3 sm:p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-purple-500/30 transition-colors duration-300 group"
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <Users
                          size={isMobile ? 14 : 18}
                          className="text-purple-400 group-hover:scale-110 transition-transform duration-300"
                        />
                        <h5 className="font-medium text-white text-xs sm:text-base">User Experience</h5>
                      </div>
                      <p className="text-[10px] sm:text-sm text-gray-400">
                        Focused on creating intuitive interfaces with accessibility and usability in mind.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="p-3 sm:p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-pink-500/30 transition-colors duration-300 group"
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <Zap
                          size={isMobile ? 14 : 18}
                          className="text-pink-400 group-hover:scale-110 transition-transform duration-300"
                        />
                        <h5 className="font-medium text-white text-xs sm:text-base">Performance</h5>
                      </div>
                      <p className="text-[10px] sm:text-sm text-gray-400">
                        Optimized for speed with efficient code, lazy loading, and performance monitoring.
                      </p>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex justify-center gap-4 sm:gap-6 mt-6 sm:mt-8"
                  >
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border border-purple-500/30 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 relative overflow-hidden group text-xs sm:text-base"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <Github size={isMobile ? 14 : 18} className="relative z-10" />
                      <span className="relative z-10">View Code</span>
                    </motion.a>
                    <motion.a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-base"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={isMobile ? 14 : 18} />
                      <span>Live Demo</span>
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
