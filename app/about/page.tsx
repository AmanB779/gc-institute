import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection
          title="About Excel Academy"
          description="Empowering students to achieve academic excellence since 2008"
          image="/placeholder.svg?height=400&width=1200"
        />

        <section className="py-12 container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4">
                <p>
                  Excel Academy was founded in 2008 by a group of passionate educators with a vision to transform the
                  coaching landscape by providing quality education that focuses on conceptual understanding rather than
                  rote learning.
                </p>
                <p>
                  What started as a small institute with just 30 students has now grown into one of the most trusted
                  names in coaching with over 1,200 students enrolling each year and a track record of producing top
                  rankers in various competitive exams.
                </p>
                <p>
                  Our journey has been defined by our commitment to excellence, innovation in teaching methodologies,
                  and a student-first approach that has helped thousands of students realize their academic dreams.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Excel Academy Building"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
              <p className="max-w-3xl mx-auto text-muted-foreground">
                Guiding principles that drive our commitment to educational excellence
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="mb-6">
                  To provide quality education that empowers students to excel academically and develop critical
                  thinking skills that will serve them throughout their lives.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Deliver high-quality education accessible to all</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Foster a learning environment that encourages curiosity and innovation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Develop not just academic but holistic growth of students</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Continuously evolve our teaching methodologies based on research</span>
                  </li>
                </ul>
              </div>
              <div className="bg-background p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="mb-6">
                  To be the leading educational institution that transforms students into future leaders by providing
                  them with the knowledge, skills, and values needed to succeed in a rapidly changing world.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Create a global benchmark for quality coaching education</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Produce not just top rankers but well-rounded individuals</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Establish centers of excellence across the country</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Integrate technology and traditional teaching for optimal learning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 container">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Faculty</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Dr. Rajesh Kumar",
                position: "Director & Physics Faculty",
                experience: "15+ years",
                image: "/placeholder.svg?height=300&width=300",
                education: "PhD in Physics, IIT Delhi",
              },
              {
                name: "Prof. Anita Sharma",
                position: "Chemistry Faculty",
                experience: "12+ years",
                image: "/placeholder.svg?height=300&width=300",
                education: "MSc Chemistry, Delhi University",
              },
              {
                name: "Dr. Sunil Verma",
                position: "Mathematics Faculty",
                experience: "14+ years",
                image: "/placeholder.svg?height=300&width=300",
                education: "PhD in Mathematics, IISc Bangalore",
              },
              {
                name: "Dr. Priya Gupta",
                position: "Biology Faculty",
                experience: "10+ years",
                image: "/placeholder.svg?height=300&width=300",
                education: "MBBS, AIIMS Delhi",
              },
            ].map((faculty, index) => (
              <div key={index} className="bg-background rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-64 w-full">
                  <Image src={faculty.image || "/placeholder.svg"} alt={faculty.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{faculty.name}</h3>
                  <p className="text-primary font-medium">{faculty.position}</p>
                  <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <p>Experience: {faculty.experience}</p>
                    <p>Education: {faculty.education}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/about/faculty">View All Faculty Members</Link>
            </Button>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Our Infrastructure</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Modern Classrooms"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Modern Classrooms</h3>
                  <p className="text-muted-foreground">
                    Spacious, well-ventilated classrooms equipped with modern teaching aids for an optimal learning
                    environment.
                  </p>
                </div>
              </div>
              <div className="bg-background rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=200&width=400" alt="Science Labs" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Science Labs</h3>
                  <p className="text-muted-foreground">
                    State-of-the-art laboratories for Physics, Chemistry, and Biology to facilitate practical learning.
                  </p>
                </div>
              </div>
              <div className="bg-background rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Digital Library"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Digital Library</h3>
                  <p className="text-muted-foreground">
                    Comprehensive digital library with access to a vast collection of books, journals, and online
                    resources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-6">Our Achievements</h2>
              <div className="space-y-4">
                <p>
                  Over the years, Excel Academy has established itself as a premier coaching institute with a consistent
                  track record of producing top rankers in various competitive exams.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Over 500+ selections in IITs in the last 5 years</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>400+ students selected in top medical colleges</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>15 students in Top 100 AIR in JEE Advanced 2022</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>12 students in Top 100 AIR in NEET 2022</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Recognized as 'Best Coaching Institute' by Education Excellence Awards 2021</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/toppers">View Our Toppers</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden order-1 lg:order-2">
              <Image src="/placeholder.svg?height=400&width=600" alt="Our Achievements" fill className="object-cover" />
            </div>
          </div>
        </section>

        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Join Excel Academy Today</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Take the first step towards academic excellence and a successful career. Our expert faculty and proven
              methodology await you.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

