"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Calendar, MapPin, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import MemoryAnimation from "@/components/memory-animation"
import { Button } from "@/components/ui/button"

// Mock data for the timeline
const memories = [
  {
    id: 1,
    date: "June 15, 2020",
    title: "Summer in Paris",
    description:
      "That magical summer evening at the Eiffel Tower when the lights came on and everything felt possible.",
    location: "Paris, France",
    sentiment: "Joy",
    imageUrl: "/placeholder.svg?height=300&width=500",
    animationType: "paris",
  },
  {
    id: 2,
    date: "December 24, 2021",
    title: "First Snow",
    description: "Waking up to a blanket of snow covering everything in sight. The world was quiet and peaceful.",
    location: "Colorado, USA",
    sentiment: "Serenity",
    imageUrl: "/placeholder.svg?height=300&width=500",
    animationType: "snow",
  },
  {
    id: 3,
    date: "March 12, 2022",
    title: "Graduation Day",
    description:
      "After years of hard work, finally walking across that stage. The pride in my parents' eyes made it all worth it.",
    location: "University Auditorium",
    sentiment: "Pride",
    imageUrl: "/placeholder.svg?height=300&width=500",
    animationType: "graduation",
  },
  {
    id: 4,
    date: "August 3, 2023",
    title: "Ocean Sunrise",
    description:
      "Sitting on the beach at dawn, watching the sun emerge from the horizon. The colors were breathtaking.",
    location: "Bali, Indonesia",
    sentiment: "Wonder",
    imageUrl: "/placeholder.svg?height=300&width=500",
    animationType: "ocean",
  },
  {
    id: 5,
    date: "January 1, 2024",
    title: "New Year's Resolution",
    description:
      "Standing on the rooftop as fireworks lit up the sky, I promised myself this would be the year of growth and new adventures.",
    location: "New York City, USA",
    sentiment: "Anticipation",
    imageUrl: "/placeholder.svg?height=300&width=500",
    animationType: "fireworks",
  },
]

export default function Timeline() {
  const [expandedMemory, setExpandedMemory] = useState<number | null>(null)

  const toggleMemory = (id: number) => {
    setExpandedMemory(expandedMemory === id ? null : id)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        {/* Timeline center line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-rose-400 via-purple-500 to-blue-500"></div>

        {memories.map((memory, index) => (
          <div key={memory.id} className={cn("relative mb-24", expandedMemory === memory.id ? "z-10" : "z-0")}>
            {/* Date marker */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center border-2 border-purple-500"
            >
              <span className="text-xs font-bold text-purple-500">{memory.date.split(" ")[0].slice(0, 3)}</span>
            </motion.div>

            {/* Memory card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3, duration: 0.6 }}
              className={cn("mt-8 w-[90%] max-w-md", index % 2 === 0 ? "ml-auto" : "mr-auto")}
            >
              <div
                className={cn(
                  "bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl",
                  expandedMemory === memory.id ? "ring-2 ring-purple-500" : "",
                )}
              >
                {/* Memory header */}
                <div
                  className="p-4 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleMemory(memory.id)}
                >
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{memory.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> {memory.date}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    {expandedMemory === memory.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Memory preview (always visible) */}
                <div className="px-4 pb-4">
                  <div className="h-40 relative rounded-md overflow-hidden bg-slate-100 dark:bg-slate-700">
                    <MemoryAnimation type={memory.animationType} />
                  </div>
                </div>

                {/* Expandable content */}
                <AnimatePresence>
                  {expandedMemory === memory.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4">
                        <p className="text-slate-700 dark:text-slate-300 mb-3">{memory.description}</p>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                            <MapPin className="h-3 w-3 mr-1" /> {memory.location}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                            <Heart className="h-3 w-3 mr-1" /> {memory.sentiment}
                          </span>
                        </div>
                      </div>
                      <div className="px-4 pb-4 flex justify-end">
                        <Button size="sm" variant="outline" className="mr-2">
                          Edit Memory
                        </Button>
                        <Button size="sm">Enhance with AI</Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}
