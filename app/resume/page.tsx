import type { Metadata } from "next"
import ResumeViewer from "@/components/resume-viewer"

export const metadata: Metadata = {
  title: "Resume | Lokhith Aswa A",
  description: "View and download Lokhith Aswa A's resume",
}

export default function Resume() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
        My Resume
      </h1>
      <ResumeViewer />
    </div>
  )
}
