"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Instagram, Linkedin, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full py-6 border-t border-gray-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-black/50 pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and copyright */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              LA
            </h3>
            <p className="text-xs text-gray-500 mt-1">© {new Date().getFullYear()} Lokhith Aswa A</p>
          </div>

          {/* Contact info */}
          <div className="flex flex-wrap justify-center gap-3">
            <motion.a
              href="mailto:lokhithaswa6@gmail.com"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-800/80 hover:bg-gray-700/80 transition-colors duration-200 text-xs sm:text-sm"
            >
              <Mail className="text-purple-400" size={14} />
              <span className="text-gray-300">lokhithaswa6@gmail.com</span>
            </motion.a>

            <motion.a
              href="tel:+919025666209"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-800/80 hover:bg-gray-700/80 transition-colors duration-200 text-xs sm:text-sm"
            >
              <Phone className="text-pink-400" size={14} />
              <span className="text-gray-300">+91 9025666209</span>
            </motion.a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="https://github.com/lokhith" target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-lg flex items-center justify-center group transition-all duration-300 hover:shadow-purple-500/20 hover:border-purple-500/50"
              >
                <Github
                  size={20}
                  className="text-gray-400 group-hover:text-purple-400 transition-colors duration-300"
                />
              </motion.div>
            </Link>

            <Link href="https://instagram.com/lokhith" target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-pink-500/10 to-orange-500/10 border border-pink-500/30 shadow-lg flex items-center justify-center group transition-all duration-300 hover:shadow-pink-500/20 hover:border-pink-500/50"
              >
                <Instagram
                  size={20}
                  className="text-gray-400 group-hover:text-pink-400 transition-colors duration-300"
                />
              </motion.div>
            </Link>

            <Link href="https://linkedin.com/in/lokhith" target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 shadow-lg flex items-center justify-center group transition-all duration-300 hover:shadow-blue-500/20 hover:border-blue-500/50"
              >
                <Linkedin
                  size={20}
                  className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300"
                />
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
