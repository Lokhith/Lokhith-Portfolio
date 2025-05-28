"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Download } from "lucide-react"

export default function ResumeViewer() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-[400px] sm:h-[600px] md:h-[700px] lg:h-[800px] rounded-xl overflow-hidden shadow-2xl shadow-purple-500/10 mb-8 border border-gray-800"
        >
          <Image src="/lokhith-resume.png" alt="Lokhith Aswa Resume" fill className="object-contain" priority />
        </motion.div>

        <a
          href="https://drive.google.com/file/d/1FoidENaECKIJPQJh0cEO_as5it0pyFUV/view?usp=drive_link"
          target="_blank"
          className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
        >
          <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="text-sm sm:text-base">Download Resume</span>
        </a>
      </div>
    </div>
  )
}
