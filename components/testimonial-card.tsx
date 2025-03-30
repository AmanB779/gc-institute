import Image from "next/image"

interface TestimonialCardProps {
  name: string
  image: string
  rank: string
  testimonial: string
}

export default function TestimonialCard({ name, image, rank, testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-background rounded-xl p-6 shadow-sm border border-border/40 hover-card relative">
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-3xl"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-secondary/5 rounded-tr-3xl"></div>

      <div className="flex items-center mb-4 relative">
        <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4 border-2 border-primary p-1">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover rounded-full" />
        </div>
        <div>
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-primary font-medium">{rank}</p>
        </div>
      </div>

      <div className="relative">
        <svg
          className="absolute -top-2 -left-2 h-6 w-6 text-primary/30"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.626.41-2.032.76-1.018 1.058-1.74.858-2.168-.2-.427-.765-.558-1.343-.392-.206.056-.396.13-.57.224-.594.313-1.055.924-1.382 1.835-.135.373-.202.745-.202 1.119 0 .428.086.856.257 1.286.193.48.484.88.877 1.195.38.304.828.533 1.35.69.52.155 1.062.23 1.626.23.206 0 .357-.026.453-.077.055-.03.13-.07.228-.116v2.818c0 .855-.307 1.585-.919 2.19-.673.656-1.585.984-2.735.984-1.175 0-2.14-.347-2.886-1.04-.746-.692-1.12-1.494-1.12-2.405 0-.66.204-1.272.61-1.833.407-.562.896-.974 1.466-1.236-.035-.086-.08-.17-.136-.252-.107-.165-.197-.342-.27-.53-.073-.19-.11-.393-.11-.61 0-.422.098-.828.294-1.222.195-.393.453-.728.777-1.003.323-.277.696-.473 1.118-.59.422-.116.87-.178 1.345-.178 1.225 0 2.235.37 3.03 1.108.796.738 1.194 1.677 1.194 2.815 0 .565-.116 1.114-.347 1.642-.23.53-.58.972-1.05 1.327-.366.288-.773.493-1.22.62.1.115.214.208.343.282.293.174.648.26 1.06.26.44 0 .89-.068 1.35-.206.46-.138.88-.332 1.26-.583l.01-.003.018-.013.05-.035v-.46c-.01-.436-.092-.873-.244-1.312-.152-.44-.356-.84-.61-1.194-.26-.355-.56-.676-.91-.96-.35-.285-.73-.524-1.14-.716-.41-.192-.84-.332-1.29-.422-.45-.09-.91-.134-1.38-.134-.69 0-1.32.076-1.89.23-.57.152-1.06.362-1.47.628-.41.267-.73.58-.96.94-.23.36-.34.74-.34 1.13 0 .32.07.61.2.87.13.26.32.49.56.67.24.19.53.33.87.43.34.09.7.14 1.07.14.61 0 1.18-.12 1.7-.36.52-.24.97-.55 1.37-.94.35-.34.62-.72.8-1.12.18-.41.27-.82.27-1.21 0-.13-.01-.26-.04-.39.29.05.56.14.81.27.26.13.49.29.67.49.21.24.36.53.46.87.1.34.15.7.15 1.08 0 .37-.05.73-.15 1.08-.1.35-.26.66-.48.92-.22.26-.49.47-.81.63-.33.16-.71.24-1.15.24-.44 0-.84-.08-1.2-.24-.36-.16-.67-.38-.91-.66-.24-.28-.43-.6-.57-.96-.13-.35-.2-.72-.2-1.12 0-.12.01-.24.02-.36z"></path>
        </svg>
        <p className="text-muted-foreground italic pl-4">{testimonial}</p>
        <svg
          className="absolute -bottom-2 -right-2 h-6 w-6 text-primary/30 transform rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.626.41-2.032.76-1.018 1.058-1.74.858-2.168-.2-.427-.765-.558-1.343-.392-.206.056-.396.13-.57.224-.594.313-1.055.924-1.382 1.835-.135.373-.202.745-.202 1.119 0 .428.086.856.257 1.286.193.48.484.88.877 1.195.38.304.828.533 1.35.69.52.155 1.062.23 1.626.23.206 0 .357-.026.453-.077.055-.03.13-.07.228-.116v2.818c0 .855-.307 1.585-.919 2.19-.673.656-1.585.984-2.735.984-1.175 0-2.14-.347-2.886-1.04-.746-.692-1.12-1.494-1.12-2.405 0-.66.204-1.272.61-1.833.407-.562.896-.974 1.466-1.236-.035-.086-.08-.17-.136-.252-.107-.165-.197-.342-.27-.53-.073-.19-.11-.393-.11-.61 0-.422.098-.828.294-1.222.195-.393.453-.728.777-1.003.323-.277.696-.473 1.118-.59.422-.116.87-.178 1.345-.178 1.225 0 2.235.37 3.03 1.108.796.738 1.194 1.677 1.194 2.815 0 .565-.116 1.114-.347 1.642-.23.53-.58.972-1.05 1.327-.366.288-.773.493-1.22.62.1.115.214.208.343.282.293.174.648.26 1.06.26.44 0 .89-.068 1.35-.206.46-.138.88-.332 1.26-.583l.01-.003.018-.013.05-.035v-.46c-.01-.436-.092-.873-.244-1.312-.152-.44-.356-.84-.61-1.194-.26-.355-.56-.676-.91-.96-.35-.285-.73-.524-1.14-.716-.41-.192-.84-.332-1.29-.422-.45-.09-.91-.134-1.38-.134-.69 0-1.32.076-1.89.23-.57.152-1.06.362-1.47.628-.41.267-.73.58-.96.94-.23.36-.34.74-.34 1.13 0 .32.07.61.2.87.13.26.32.49.56.67.24.19.53.33.87.43.34.09.7.14 1.07.14.61 0 1.18-.12 1.7-.36.52-.24.97-.55 1.37-.94.35-.34.62-.72.8-1.12.18-.41.27-.82.27-1.21 0-.13-.01-.26-.04-.39.29.05.56.14.81.27.26.13.49.29.67.49.21.24.36.53.46.87.1.34.15.7.15 1.08 0 .37-.05.73-.15 1.08-.1.35-.26.66-.48.92-.22.26-.49.47-.81.63-.33.16-.71.24-1.15.24-.44 0-.84-.08-1.2-.24-.36-.16-.67-.38-.91-.66-.24-.28-.43-.6-.57-.96-.13-.35-.2-.72-.2-1.12 0-.12.01-.24.02-.36z"></path>
        </svg>
      </div>
    </div>
  )
}

