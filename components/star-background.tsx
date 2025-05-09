"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  blinking: boolean
  blinkDuration: number
}

interface ShootingStar {
  x: number
  y: number
  length: number
  angle: number
  speed: number
  delay: number
  duration: number
}

export default function StarBackground() {
  // Create stars with different properties - increased from 150 to 250
  const stars: Star[] = Array.from({ length: 250 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.7 + 0.3,
    blinking: Math.random() > 0.7,
    blinkDuration: Math.random() * 3 + 2,
  }))

  // Create shooting stars - increased from 5 to 8
  const shootingStars: ShootingStar[] = Array.from({ length: 8 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    length: Math.random() * 150 + 50,
    angle: Math.random() * 60 - 30,
    speed: Math.random() * 10 + 10,
    delay: Math.random() * 15,
    duration: Math.random() * 2 + 1,
  }))

  // Create a reference for the canvas element
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Create a nebula effect with canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create gradient for nebula
    const createNebula = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create multiple nebula clouds
      const createNebulaCloud = (x: number, y: number, radius: number, color1: string, color2: string) => {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, color1)
        gradient.addColorStop(1, color2)

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.globalAlpha = 0.05
        ctx.fill()
      }

      // Purple nebula
      createNebulaCloud(
        canvas.width * 0.2,
        canvas.height * 0.3,
        canvas.width * 0.4,
        "rgba(147, 51, 234, 0.3)",
        "rgba(0, 0, 0, 0)",
      )

      // Pink nebula
      createNebulaCloud(
        canvas.width * 0.8,
        canvas.height * 0.7,
        canvas.width * 0.5,
        "rgba(236, 72, 153, 0.3)",
        "rgba(0, 0, 0, 0)",
      )

      // Blue nebula
      createNebulaCloud(
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.6,
        "rgba(59, 130, 246, 0.2)",
        "rgba(0, 0, 0, 0)",
      )

      // Additional teal nebula
      createNebulaCloud(
        canvas.width * 0.3,
        canvas.height * 0.8,
        canvas.width * 0.4,
        "rgba(20, 184, 166, 0.2)",
        "rgba(0, 0, 0, 0)",
      )
    }

    // Initial render
    createNebula()

    // Render on resize
    window.addEventListener("resize", createNebula)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", createNebula)
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Canvas for nebula effect */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle moving background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-black/0 to-pink-900/5"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.05) 0%, rgba(0, 0, 0, 0) 70%)",
            "radial-gradient(circle at 70% 60%, rgba(147, 51, 234, 0.05) 0%, rgba(0, 0, 0, 0) 70%)",
            "radial-gradient(circle at 40% 80%, rgba(147, 51, 234, 0.05) 0%, rgba(0, 0, 0, 0) 70%)",
            "radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.05) 0%, rgba(0, 0, 0, 0) 70%)",
          ],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
        }}
      />

      {/* Stars */}
      {stars.map((star, index) => (
        <motion.div
          key={`star-${index}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`,
          }}
          animate={
            star.blinking
              ? {
                  opacity: [star.opacity, star.opacity * 0.3, star.opacity],
                }
              : {}
          }
          transition={
            star.blinking
              ? {
                  duration: star.blinkDuration,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }
              : {}
          }
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((shootingStar, index) => (
        <motion.div
          key={`shooting-star-${index}`}
          className="absolute bg-white rounded-full overflow-hidden"
          style={{
            left: `${shootingStar.x}%`,
            top: `${shootingStar.y}%`,
            width: `${shootingStar.length}px`,
            height: "1px",
            transformOrigin: "left center",
            transform: `rotate(${shootingStar.angle}deg)`,
            opacity: 0,
          }}
          animate={{
            x: [`0%`, `${shootingStar.speed * 100}%`],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: shootingStar.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: shootingStar.delay,
            repeatDelay: 15 + Math.random() * 10,
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white via-white to-transparent"
            style={{
              boxShadow: "0 0 4px rgba(255, 255, 255, 0.8)",
            }}
          />
        </motion.div>
      ))}

      {/* Cosmic dust particles - increased from 50 to 80 */}
      {Array.from({ length: 80 }).map((_, index) => (
        <motion.div
          key={`dust-${index}`}
          className="absolute rounded-full bg-white/10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
          }}
          animate={{
            y: [0, Math.random() * 30 - 15],
            x: [0, Math.random() * 30 - 15],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Subtle color overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-black/0 to-pink-900/5 pointer-events-none" />

      {/* Subtle moving stars in the foreground */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, index) => (
          <motion.div
            key={`moving-star-${index}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.7 + 0.3,
              boxShadow: `0 0 ${Math.random() * 4 + 2}px rgba(255, 255, 255, 0.8)`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: Math.random() * 60 + 30,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  )
}
