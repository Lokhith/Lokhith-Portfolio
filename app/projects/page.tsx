import type { Metadata } from "next"
import ProjectsShowcase from "@/components/projects-showcase"

export const metadata: Metadata = {
  title: "Projects | Lokhith Aswa A",
  description: "Explore innovative projects developed by Lokhith Aswa A",
}

export default function Projects() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
        My Creative Universe
      </h1>
      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
        Dive into my digital playground where code meets creativity. Each project represents a unique challenge
        conquered and a problem solved with passion and precision.
      </p>
      <ProjectsShowcase />
    </div>
  )
}
