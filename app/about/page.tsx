import type { Metadata } from "next"
import AboutSection from "@/components/about-section"
import UnifiedSkillsSection from "@/components/unified-skills-section"

export const metadata: Metadata = {
  title: "About | Lokhith Aswa A",
  description: "Learn more about Lokhith Aswa A and his professional skills",
}

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <AboutSection />
      <UnifiedSkillsSection />
    </div>
  )
}
