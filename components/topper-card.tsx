import Image from "next/image"

interface TopperCardProps {
  name: string
  image: string
  rank: string
  college: string
  testimonial: string
}

export default function TopperCard({ name, image, rank, college, testimonial }: TopperCardProps) {
  return (
    <div className="bg-background rounded-xl overflow-hidden shadow-sm border border-border/40 hover-card group">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">
          {rank}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">{name}</h3>
        <p className="text-secondary font-medium text-sm">{college}</p>
        <div className="mt-3 pt-3 border-t">
          <p className="text-muted-foreground text-sm italic line-clamp-3">"{testimonial}"</p>
        </div>
      </div>
    </div>
  )
}

