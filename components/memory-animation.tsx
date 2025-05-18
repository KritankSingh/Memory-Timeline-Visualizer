"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

// Mock animation data - in a real app, these would be actual Lottie JSON files
const animationTypes = {
  paris: {
    colors: ["#FF9999", "#FFD700"],
    speed: 1,
    elements: [
      { type: "circle", position: { x: 50, y: 50 }, size: 20, color: "#FF9999" },
      { type: "rect", position: { x: 70, y: 30 }, size: 15, color: "#FFD700" },
    ],
  },
  snow: {
    colors: ["#FFFFFF", "#E0F7FA"],
    speed: 0.5,
    elements: [
      { type: "circle", position: { x: 30, y: 40 }, size: 5, color: "#FFFFFF" },
      { type: "circle", position: { x: 60, y: 20 }, size: 7, color: "#E0F7FA" },
      { type: "circle", position: { x: 80, y: 60 }, size: 4, color: "#FFFFFF" },
    ],
  },
  graduation: {
    colors: ["#4CAF50", "#FFC107"],
    speed: 0.8,
    elements: [
      { type: "rect", position: { x: 50, y: 50 }, size: 25, color: "#4CAF50" },
      { type: "circle", position: { x: 50, y: 30 }, size: 15, color: "#FFC107" },
    ],
  },
  ocean: {
    colors: ["#03A9F4", "#00BCD4"],
    speed: 0.6,
    elements: [
      { type: "rect", position: { x: 0, y: 70 }, size: 100, color: "#03A9F4" },
      { type: "circle", position: { x: 70, y: 30 }, size: 20, color: "#00BCD4" },
    ],
  },
  fireworks: {
    colors: ["#F44336", "#9C27B0", "#FFEB3B"],
    speed: 1.2,
    elements: [
      { type: "circle", position: { x: 50, y: 50 }, size: 10, color: "#F44336" },
      { type: "circle", position: { x: 30, y: 30 }, size: 8, color: "#9C27B0" },
      { type: "circle", position: { x: 70, y: 40 }, size: 12, color: "#FFEB3B" },
    ],
  },
}

interface MemoryAnimationProps {
  type: string
  className?: string
}

export default function MemoryAnimation({ type, className }: MemoryAnimationProps) {
  const animationContainer = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Get animation data based on type
    const animData = animationTypes[type as keyof typeof animationTypes] || animationTypes.paris

    // Simple animation function to simulate Lottie-style animations
    const animate = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Get current time for animation
      const time = Date.now() * 0.001 * animData.speed

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, animData.colors[0] + "33") // Add transparency
      gradient.addColorStop(1, animData.colors[1] + "33")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw animated elements
      animData.elements.forEach((element, index) => {
        ctx.save()

        // Calculate animated position
        const x = (element.position.x / 100) * canvas.width + Math.sin(time + index) * 10
        const y = (element.position.y / 100) * canvas.height + Math.cos(time + index * 0.7) * 10

        // Draw element
        ctx.fillStyle = element.color
        if (element.type === "circle") {
          ctx.beginPath()
          const size =
            (element.size / 100) * Math.min(canvas.width, canvas.height) * (0.8 + Math.sin(time * 2 + index) * 0.2)
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        } else if (element.type === "rect") {
          const size =
            (element.size / 100) * Math.min(canvas.width, canvas.height) * (0.8 + Math.sin(time * 2 + index) * 0.2)
          ctx.fillRect(x - size / 2, y - size / 2, size, size)
        }

        ctx.restore()
      })

      // Continue animation loop
      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [type])

  return (
    <div ref={animationContainer} className={cn("w-full h-full relative", className)}>
      <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />

      {/* Overlay content based on animation type */}
      {type === "paris" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-32 border-t-2 border-l-2 border-r-2 border-gray-400 bg-gray-200 opacity-70"></div>
        </div>
      )}

      {type === "graduation" && (
        <div className="absolute bottom-4 right-4">
          <div className="w-12 h-8 bg-black opacity-50 transform rotate-12"></div>
        </div>
      )}

      {type === "ocean" && (
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-blue-500 to-transparent opacity-30"></div>
      )}

      {type === "fireworks" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-black opacity-30"></div>
        </div>
      )}
    </div>
  )
}
