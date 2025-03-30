import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock, Users, ArrowRight } from "lucide-react"

interface BatchCardProps {
  title: string
  description: string
  image: string
  duration: string
  students: string
  link: string
}

export default function BatchCard({ title, description, image, duration, students, link }: BatchCardProps) {
  return (
    <div className="bg-background rounded-xl overflow-hidden shadow-sm border border-border/40 hover-card group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-primary" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-primary" />
            <span>{students} students</span>
          </div>
        </div>
        <div className="mt-4">
          <Button
            className="w-full rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
            asChild
          >
            <Link href={link} className="flex items-center justify-center">
              Learn More
              <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

