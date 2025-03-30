import Image from "next/image"

interface HeroSectionProps {
  title: string
  description: string
  image: string
}

export default function HeroSection({ title, description, image }: HeroSectionProps) {
  return (
    <section className="relative">
      <div className="relative h-[350px] md:h-[450px]">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover brightness-[0.7]" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />

        {/* Animated shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-70"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-70 animation-delay-2000"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-slide-down">
            <span className="gradient-text">{title}</span>
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-base md:text-xl animate-slide-up">{description}</p>
        </div>
      </div>
    </section>
  )
}

