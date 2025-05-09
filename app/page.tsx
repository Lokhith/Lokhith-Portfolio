import type { Metadata } from "next"
import Hero from "@/components/hero"

export const metadata: Metadata = {
  title: "Home | Lokhith Aswa A",
  description: "Personal portfolio of Lokhith Aswa A - Software Developer, MERN Stack Developer, Prompt Engineer",
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <Hero />
    </div>
  )
}
