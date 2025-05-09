"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useMotionValue } from "framer-motion"

export default function CosmicBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const constellationCanvasRef = useRef<HTMLCanvasElement>(null)
  const controls = useAnimation()
  const parallaxFactor = useMotionValue(0)

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })
      parallaxFactor.set(Math.sqrt(x * x + y * y))
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [parallaxFactor])

  // Create stars with different properties
  const stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 0.5,
    opacity: Math.random() * 0.7 + 0.3,
    blinking: Math.random() > 0.7,
    blinkDuration: Math.random() * 3 + 2,
    parallaxIntensity: Math.random() * 15 + 5,
  }))

  // Create larger celestial objects
  const celestialObjects = Array.from({ length: 5 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 40 + 60,
    opacity: Math.random() * 0.15 + 0.05,
    color: [
      "from-purple-600/20 to-indigo-600/5",
      "from-pink-600/20 to-purple-600/5",
      "from-blue-600/20 to-cyan-600/5",
      "from-indigo-600/20 to-blue-600/5",
      "from-violet-600/20 to-fuchsia-600/5",
    ][Math.floor(Math.random() * 5)],
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 0.1,
    parallaxIntensity: Math.random() * 20 + 10,
  }))

  // Create shooting stars
  const shootingStars = Array.from({ length: 8 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    length: Math.random() * 200 + 100,
    angle: Math.random() * 60 - 30,
    speed: Math.random() * 15 + 10,
    delay: Math.random() * 15,
    duration: Math.random() * 2 + 1,
  }))

  // Create nebula effect with canvas
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

      // Create multiple nebula clouds with more vibrant colors
      const createNebulaCloud = (
        x: number,
        y: number,
        radius: number,
        color1: string,
        color2: string,
        opacity: number,
      ) => {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, color1)
        gradient.addColorStop(1, color2)

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.globalAlpha = opacity
        ctx.fill()
      }

      // Deep purple nebula
      createNebulaCloud(
        canvas.width * 0.2,
        canvas.height * 0.3,
        canvas.width * 0.5,
        "rgba(147, 51, 234, 0.4)",
        "rgba(0, 0, 0, 0)",
        0.08,
      )

      // Vibrant pink nebula
      createNebulaCloud(
        canvas.width * 0.8,
        canvas.height * 0.7,
        canvas.width * 0.6,
        "rgba(236, 72, 153, 0.4)",
        "rgba(0, 0, 0, 0)",
        0.08,
      )

      // Deep blue nebula
      createNebulaCloud(
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.7,
        "rgba(59, 130, 246, 0.3)",
        "rgba(0, 0, 0, 0)",
        0.07,
      )

      // Teal accent nebula
      createNebulaCloud(
        canvas.width * 0.3,
        canvas.height * 0.8,
        canvas.width * 0.4,
        "rgba(20, 184, 166, 0.3)",
        "rgba(0, 0, 0, 0)",
        0.06,
      )

      // Violet accent nebula
      createNebulaCloud(
        canvas.width * 0.7,
        canvas.height * 0.2,
        canvas.width * 0.4,
        "rgba(139, 92, 246, 0.3)",
        "rgba(0, 0, 0, 0)",
        0.07,
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

  // Create constellation effect
  useEffect(() => {
    const canvas = constellationCanvasRef.current
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

    // Create constellation points
    const points = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.3,
    }))

    // Draw constellations
    const drawConstellations = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update points position
      points.forEach((point) => {
        point.x += point.vx
        point.y += point.vy

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1

        // Draw point
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${point.opacity})`
        ctx.fill()
      })

      // Connect nearby points
      ctx.beginPath()
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x
          const dy = points[i].y - points[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(points[j].x, points[j].y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 150)})`
            ctx.lineWidth = 0.5
          }
        }
      }
      ctx.stroke()

      requestAnimationFrame(drawConstellations)
    }

    drawConstellations()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  // Animate cosmic dust
  useEffect(() => {
    controls.start({
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.2, 1],
      transition: {
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    })
  }, [controls])

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Canvas for nebula effect */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Canvas for constellation effect */}
      <canvas ref={constellationCanvasRef} className="absolute inset-0 w-full h-full" />

      {/* Celestial objects with parallax */}
      {celestialObjects.map((obj, index) => (
        <motion.div
          key={`celestial-${index}`}
          className={`absolute rounded-full bg-gradient-to-br ${obj.color} blur-3xl`}
          style={{
            left: `${obj.x}%`,
            top: `${obj.y}%`,
            width: `${obj.size}px`,
            height: `${obj.size}px`,
            opacity: obj.opacity,
            rotate: obj.rotation,
          }}
          animate={{
            rotate: [obj.rotation, obj.rotation + 360 * obj.rotationSpeed],
            x: mousePosition.x * obj.parallaxIntensity * -1,
            y: mousePosition.y * obj.parallaxIntensity * -1,
          }}
          transition={{
            rotate: {
              duration: 120,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            x: { type: "spring", stiffness: 50, damping: 30 },
            y: { type: "spring", stiffness: 50, damping: 30 },
          }}
        />
      ))}

      {/* Stars with parallax */}
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
          animate={{
            opacity: star.blinking ? [star.opacity, star.opacity * 0.3, star.opacity] : [star.opacity, star.opacity],
            x: mousePosition.x * star.parallaxIntensity * -1,
            y: mousePosition.y * star.parallaxIntensity * -1,
            scale: star.blinking ? [1, 1.2, 1] : [1, 1],
          }}
          transition={{
            opacity: {
              duration: star.blinkDuration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            },
            scale: {
              duration: star.blinkDuration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            },
            x: { type: "spring", stiffness: 50, damping: 30 },
            y: { type: "spring", stiffness: 50, damping: 30 },
          }}
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
            height: "1.5px",
            transformOrigin: "left center",
            transform: `rotate(${shootingStar.angle}deg)`,
            opacity: 0,
          }}
          animate={{
            x: [`0%`, `${shootingStar.speed * 100}%`],
            opacity: [0, 0.8, 0],
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
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
            }}
          />
        </motion.div>
      ))}

      {/* Cosmic dust particles */}
      {Array.from({ length: 80 }).map((_, index) => (
        <motion.div
          key={`dust-${index}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            background: `rgba(${
              Math.random() > 0.5 ? "147, 51, 234" : Math.random() > 0.5 ? "236, 72, 153" : "59, 130, 246"
            }, ${Math.random() * 0.2 + 0.1})`,
          }}
          animate={{
            y: [0, Math.random() * 50 - 25],
            x: [0, Math.random() * 50 - 25],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, Math.random() * 1.5 + 1, 1],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Pulsating cosmic energy */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5"
        animate={controls}
        style={{
          width: "60%",
          height: "60%",
          filter: "blur(100px)",
        }}
      />

      {/* Subtle color overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black/0 to-pink-900/10 pointer-events-none" />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
    </div>
  )
}
