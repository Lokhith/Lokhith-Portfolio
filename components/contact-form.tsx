"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Loader2, Send, User, Mail, Phone, MessageSquare } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
}

interface ContactFormProps {
  onClose: () => void
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Close form when ESC key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscKey)

    return () => {
      window.removeEventListener("keydown", handleEscKey)
    }
  }, [onClose])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSuccess(true)

        // Close modal after success
        setTimeout(() => {
          onClose()
        }, 2000)
      }, 1500)
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-90"></div>

        {/* Top left blob */}
        <div className="absolute -top-16 -left-16 sm:-top-20 sm:-left-20 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-yellow-500/5 blur-3xl"></div>

        {/* Bottom right blob */}
        <div className="absolute -bottom-16 -right-16 sm:-bottom-20 sm:-right-20 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-tl from-purple-500/20 via-pink-500/10 to-red-500/5 blur-3xl"></div>

        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-gradient-to-b from-orange-500/5 to-purple-500/5 blur-3xl rounded-full"></div>

        {/* Animated particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6 sm:p-8 md:p-10">
        <div className="text-center mb-6 sm:mb-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent mb-2">
              Get in Touch
            </h2>
            <p className="text-gray-300 mt-2 max-w-md mx-auto text-sm sm:text-base">
              I'd love to hear from you! Fill out the form below and I'll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-8 sm:py-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, times: [0, 0.8, 1] }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center mb-5 sm:mb-6"
            >
              <CheckCircle2 className="text-green-500" size={isMobile ? 32 : 40} />
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Message Sent!</h3>
            <p className="text-gray-300 text-center max-w-sm text-sm sm:text-base">
              Thank you for reaching out. I'll get back to you as soon as possible.
            </p>

            {/* Animated success indicator */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-6 sm:mt-8 max-w-xs"
            />
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 sm:space-y-5 max-w-md mx-auto"
          >
            <div className="relative">
              <label
                htmlFor="name"
                className={`block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 transition-colors duration-200 ${
                  focusedField === "name" ? "text-orange-300" : "text-gray-300"
                }`}
              >
                Name
              </label>
              <div className="relative">
                <div
                  className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 ${
                    focusedField === "name" ? "text-orange-400" : ""
                  }`}
                >
                  <User size={isMobile ? 16 : 18} />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg bg-gray-800/50 border text-sm sm:text-base ${
                    errors.name ? "border-red-500" : focusedField === "name" ? "border-orange-500" : "border-gray-700"
                  } focus:outline-none focus:ring-2 ${
                    errors.name ? "focus:ring-red-500/20" : "focus:ring-orange-500/20"
                  } text-white transition-all duration-200`}
                  placeholder="Your full name"
                />

                {/* Animated focus highlight */}
                {focusedField === "name" && (
                  <motion.div
                    layoutId="focusHighlight"
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-500 flex items-center"
                >
                  {errors.name}
                </motion.p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="email"
                className={`block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 transition-colors duration-200 ${
                  focusedField === "email" ? "text-orange-300" : "text-gray-300"
                }`}
              >
                Email
              </label>
              <div className="relative">
                <div
                  className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 ${
                    focusedField === "email" ? "text-orange-400" : ""
                  }`}
                >
                  <Mail size={isMobile ? 16 : 18} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg bg-gray-800/50 border text-sm sm:text-base ${
                    errors.email ? "border-red-500" : focusedField === "email" ? "border-orange-500" : "border-gray-700"
                  } focus:outline-none focus:ring-2 ${
                    errors.email ? "focus:ring-red-500/20" : "focus:ring-orange-500/20"
                  } text-white transition-all duration-200`}
                  placeholder="your.email@example.com"
                />

                {/* Animated focus highlight */}
                {focusedField === "email" && (
                  <motion.div
                    layoutId="focusHighlight"
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-500 flex items-center"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="phone"
                className={`block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 transition-colors duration-200 ${
                  focusedField === "phone" ? "text-orange-300" : "text-gray-300"
                }`}
              >
                Phone Number
              </label>
              <div className="relative">
                <div
                  className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 ${
                    focusedField === "phone" ? "text-orange-400" : ""
                  }`}
                >
                  <Phone size={isMobile ? 16 : 18} />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg bg-gray-800/50 border text-sm sm:text-base ${
                    errors.phone ? "border-red-500" : focusedField === "phone" ? "border-orange-500" : "border-gray-700"
                  } focus:outline-none focus:ring-2 ${
                    errors.phone ? "focus:ring-red-500/20" : "focus:ring-orange-500/20"
                  } text-white transition-all duration-200`}
                  placeholder="+91 9025666209"
                />

                {/* Animated focus highlight */}
                {focusedField === "phone" && (
                  <motion.div
                    layoutId="focusHighlight"
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-500 flex items-center"
                >
                  {errors.phone}
                </motion.p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="message"
                className={`block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 transition-colors duration-200 ${
                  focusedField === "message" ? "text-orange-300" : "text-gray-300"
                }`}
              >
                Message
              </label>
              <div className="relative">
                <div
                  className={`absolute left-3 top-3 text-gray-400 transition-colors duration-200 ${
                    focusedField === "message" ? "text-orange-400" : ""
                  }`}
                >
                  <MessageSquare size={isMobile ? 16 : 18} />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={isMobile ? 3 : 4}
                  className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg bg-gray-800/50 border text-sm sm:text-base ${
                    errors.message
                      ? "border-red-500"
                      : focusedField === "message"
                        ? "border-orange-500"
                        : "border-gray-700"
                  } focus:outline-none focus:ring-2 ${
                    errors.message ? "focus:ring-red-500/20" : "focus:ring-orange-500/20"
                  } text-white resize-none transition-all duration-200`}
                  placeholder="Tell me about your project or idea..."
                ></textarea>

                {/* Animated focus highlight */}
                {focusedField === "message" && (
                  <motion.div
                    layoutId="focusHighlight"
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-500 flex items-center"
                >
                  {errors.message}
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 sm:mt-8 py-3 sm:py-3.5 px-4 sm:px-6 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm sm:text-base font-medium hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2 disabled:opacity-70 relative overflow-hidden group"
            >
              {/* Button background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              {/* Button content */}
              <div className="relative z-10 flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={isMobile ? 18 : 20} />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send
                      size={isMobile ? 18 : 20}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                    <span>Send Message</span>
                  </>
                )}
              </div>

              {/* Button shine effect */}
              <motion.div
                className="absolute top-0 -left-20 w-20 h-full transform rotate-12 bg-white opacity-10"
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
              />
            </motion.button>
          </motion.form>
        )}
      </div>
    </div>
  )
}
