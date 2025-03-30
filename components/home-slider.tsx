"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    image: "/placeholder.svg?height=600&width=1600",
    title: "Achieve Academic Excellence",
    description: "Join Excel Academy for comprehensive coaching and guidance for JEE, NEET, and Foundation courses.",
    cta: "Explore Courses",
    link: "/batches",
  },
  {
    image: "/placeholder.svg?height=600&width=1600",
    title: "Learn from Expert Faculty",
    description: "Our experienced faculty members are dedicated to helping you achieve your academic goals.",
    cta: "Meet Our Faculty",
    link: "/about",
  },
  {
    image: "/placeholder.svg?height=600&width=1600",
    title: "Success Stories That Inspire",
    description: "Our students consistently secure top ranks in various competitive exams. Be the next success story.",
    cta: "View Our Toppers",
    link: "/toppers",
  },
]

export default function HomeSlider() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent(current === slides.length - 1 ? 0 : current + 1)
    setTimeout(() => setIsAnimating(false), 1000)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent(current === 0 ? slides.length - 1 : current - 1)
    setTimeout(() => setIsAnimating(false), 1000)
  }

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      nextSlide()
    }, 6000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [current, isAnimating])

  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === current ? "opacity-100 scale-100" : "opacity-0 scale-110"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover brightness-[0.7]"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1
              className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-4xl transition-all duration-1000 ${
                index === current ? "animate-slide-down opacity-100" : "opacity-0 -translate-y-10"
              }`}
            >
              <span className="gradient-text">{slide.title}</span>
            </h1>
            <p
              className={`text-white/90 max-w-2xl mx-auto text-base md:text-xl mb-8 transition-all duration-1000 delay-300 ${
                index === current ? "animate-slide-up opacity-100" : "opacity-0 translate-y-10"
              }`}
            >
              {slide.description}
            </p>
            <div
              className={`transition-all duration-1000 delay-500 ${
                index === current ? "animate-zoom-in opacity-100" : "opacity-0 scale-90"
              }`}
            >
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 text-white px-8"
                asChild
              >
                <Link href={slide.link}>{slide.cta}</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-primary/80 transition-colors z-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous</span>
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-primary/80 transition-colors z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next</span>
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-primary w-10" : "bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => {
              if (isAnimating) return
              setIsAnimating(true)
              setCurrent(index)
              setTimeout(() => setIsAnimating(false), 1000)
            }}
          >
            <span className="sr-only">Slide {index + 1}</span>
          </button>
        ))}
      </div>

      {/* Animated shapes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-70"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-70 animation-delay-2000"></div>
    </div>
  )
}

