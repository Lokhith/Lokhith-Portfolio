"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, User, Briefcase, FileText } from "lucide-react"

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: User },
  { name: "Projects", path: "/projects", icon: Briefcase },
  { name: "Resume", path: "/resume", icon: FileText },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-gray-800">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          const Icon = item.icon

          return (
            <Link key={item.path} href={item.path} className="w-full">
              <div className="flex flex-col items-center py-2">
                <div className="relative">
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full"
                    />
                  )}
                  <Icon size={20} className={`relative z-10 ${isActive ? "text-white" : "text-gray-400"}`} />
                </div>
                <span className={`text-xs mt-1 ${isActive ? "text-white" : "text-gray-400"}`}>{item.name}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
