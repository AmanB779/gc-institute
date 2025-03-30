import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, Download, Lock } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import { Input } from "@/components/ui/input"

export default function NotesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection
          title="Study Notes & Materials"
          description="Access comprehensive study materials prepared by our expert faculty"
          image="/placeholder.svg?height=400&width=1200"
        />

        <section className="py-12 container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold">Study Resources</h2>
              <p className="text-muted-foreground mt-2">
                Access high-quality study materials for your exam preparation
              </p>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search notes..." className="pl-8" />
            </div>
          </div>

          <Tabs defaultValue="jee" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="jee">JEE</TabsTrigger>
                <TabsTrigger value="neet">NEET</TabsTrigger>
                <TabsTrigger value="foundation">Foundation</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="jee" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Physics - Mechanics",
                    description: "Comprehensive notes on Newtonian Mechanics, Rotational Motion, and Gravitation",
                    image: "/placeholder.svg?height=200&width=400",
                    pages: 120,
                    premium: false,
                  },
                  {
                    title: "Chemistry - Organic Chemistry",
                    description: "Detailed notes on Organic Reactions, Mechanisms, and Named Reactions",
                    image: "/placeholder.svg?height=200&width=400",
                    pages: 150,
                    premium: false,
                  },
                  {
                    title: "Mathematics - Calculus",
                    description: "Complete guide to Differential and Integral Calculus with solved examples",
                    image: "/placeholder.svg?height=200&width=400",
                    pages: 180,
                    premium: false,
                  },
                  {
                    title: "Physics - Electromagnetism",
                    description: "In-depth coverage of Electricity, Magnetism, and Electromagnetic Induction",
                    image: "/placeholder.svg?height=200&width=400",
                    pages: 140,
                    premium: true,
                  },
                  {
                    title: "Chemistry - Physical Chemistry",
                    description: "Comprehensive notes on Thermodynamics, Kinetics, and Electrochemistry",
                    image: "/placeholder.svg?height=200&width=400",
                    pages: 160,
                    premium: true,
                  },
                  {
                    title: "Mathematics - Coordinate Geometry",
                    description: "Detailed coverage of 2D and 3D Coordinate Geometry with practice problems",
                    image: "/placeholder.svg?height=200&width=400",
                    pages: 130,
                    premium: true,
                  },
                ].map((note, index) => (
                  <div key={index} className="bg-background rounded-lg overflow-hidden shadow-sm border">
                    <div className="relative h-48">
                      <Image src={note.image || "/placeholder.svg"} alt={note.title} fill className="object-cover" />
                      {note.premium && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center">
                          <Lock className="h-3 w-3 mr-1" />
                          Premium
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{note.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{note.description}</p>
                      <div className="flex items-center mt-3 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4 mr-1" />
                        <span>{note.pages} pages</span>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        {note.premium ? (
                          <Button variant="outline" size="sm" asChild>
                            <Link href="/contact">Get Access</Link>
                          </Button>
                        ) : (
                          <Button size="sm" className="flex items-center" asChild>
                            <Link href="#">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Link>
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="#">Preview</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="neet" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Biology - Human Physiology",
                    description: "Detailed notes on all human body systems with diagrams and explanations",
                    image: "/placeholder.svg?height=200&width=400",
                    pages: 200,
                    premium: false,
                  },
                  {
                    title: "Chemistry - Organic Chemistry",
                    description: "Comprehensive coverage of Biomolecules, Polymers, and Medicinal Chemistry",
                    image: "/placeholder.svg?height=200&width=400",
                    pages: 180,
                    premium: false,
                  },
                  {
                    title: "Physics - Mechanics & Optics",
                    description: "Important concepts and formulas for NEET Physics with solved examples",
                    image: "/placeholder.svg?height=200&width=400",
                    pages: 150,
                    premium: false,
                  },
                  {
                    title: "Biology - Genetics & Evolution",
                    description: "In-depth coverage of Molecular Basis of Inheritance and Evolution",
                    image: "/placeholder.svg?height=200&width=400",
                    pages: 170,
                    premium: true,
                  },
                  {
                    title: "Chemistry - Physical Chemistry",
                    description: "Key concepts in Thermodynamics, Equilibrium, and Electrochemistry for NEET",
                    image: "/placeholder.svg?height=200&width=400",
                    pages: 160,
                    premium: true,
                  },
                  {
                    title: "Biology - Plant Physiology",
                    description: "Comprehensive notes on Plant Growth, Development, and Reproduction",
                    image: "/placeholder.svg?height=200&width=400",
                    pages: 140,
                    premium: true,
                  },
                ].map((note, index) => (
                  <div key={index} className="bg-background rounded-lg overflow-hidden shadow-sm border">
                    <div className="relative h-48">
                      <Image src={note.image || "/placeholder.svg"} alt={note.title} fill className="object-cover" />
                      {note.premium && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center">
                          <Lock className="h-3 w-3 mr-1" />
                          Premium
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{note.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{note.description}</p>
                      <div className="flex items-center mt-3 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4 mr-1" />
                        <span>{note.pages} pages</span>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        {note.premium ? (
                          <Button variant="outline" size="sm" asChild>
                            <Link href="/contact">Get Access</Link>
                          </Button>
                        ) : (
                          <Button size="sm" className="flex items-center" asChild>
                            <Link href="#">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Link>
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="#">Preview</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="foundation" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Mathematics - Class 9-10",
                    description: "Complete coverage of NCERT Mathematics for Class 9 and 10 with examples",
                    image: "/placeholder.svg?height=200&width=400",
                    pages: 250,
                    premium: false,
                  },
                  {
                    title: "Science - Class 9-10",
                    description: "Comprehensive notes on Physics, Chemistry, and Biology for Class 9-10",
                    image: "/placeholder.svg?height=200&width=400",
                    pages: 300,
                    premium: false,
                  },
                  {
                    title: "Mathematics - Class 11-12",
                    description: "Detailed notes on Class 11-12 Mathematics with solved examples",
                    image: "/placeholder.svg?height=200&width=400",
                    pages: 280,
                    premium: false,
                  },
                  {
                    title: "Physics - Class 11-12",
                    description: "Comprehensive coverage of Class 11-12 Physics with practice problems",
                    image: "/placeholder.svg?height=200&width=400",
                    pages: 240,
                    premium: true,
                  },
                  {
                    title: "Chemistry - Class 11-12",
                    description: "In-depth notes on Organic, Inorganic, and Physical Chemistry for Class 11-12",
                    image: "/placeholder.svg?height=200&width=400",
                    pages: 260,
                    premium: true,
                  },
                  {
                    title: "Biology - Class 11-12",
                    description: "Detailed coverage of Class 11-12 Biology with diagrams and explanations",
                    image: "/placeholder.svg?height=200&width=400",
                    pages: 220,
                    premium: true,
                  },
                ].map((note, index) => (
                  <div key={index} className="bg-background rounded-lg overflow-hidden shadow-sm border">
                    <div className="relative h-48">
                      <Image src={note.image || "/placeholder.svg"} alt={note.title} fill className="object-cover" />
                      {note.premium && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center">
                          <Lock className="h-3 w-3 mr-1" />
                          Premium
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{note.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{note.description}</p>
                      <div className="flex items-center mt-3 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4 mr-1" />
                        <span>{note.pages} pages</span>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        {note.premium ? (
                          <Button variant="outline" size="sm" asChild>
                            <Link href="/contact">Get Access</Link>
                          </Button>
                        ) : (
                          <Button size="sm" className="flex items-center" asChild>
                            <Link href="#">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Link>
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="#">Preview</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Previous Year Question Papers</h2>
                <p className="text-muted-foreground mb-6">
                  Practice with previous year question papers to understand the exam pattern and improve your time
                  management skills.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <h3 className="font-medium">JEE Main 2023 Question Paper</h3>
                        <p className="text-sm text-muted-foreground">With detailed solutions</p>
                      </div>
                    </div>
                    <Button size="sm" className="flex items-center" asChild>
                      <Link href="#">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <h3 className="font-medium">JEE Advanced 2023 Question Paper</h3>
                        <p className="text-sm text-muted-foreground">With detailed solutions</p>
                      </div>
                    </div>
                    <Button size="sm" className="flex items-center" asChild>
                      <Link href="#">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <h3 className="font-medium">NEET 2023 Question Paper</h3>
                        <p className="text-sm text-muted-foreground">With detailed solutions</p>
                      </div>
                    </div>
                    <Button size="sm" className="flex items-center" asChild>
                      <Link href="#">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" asChild>
                    <Link href="#">View All Question Papers</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Question Papers"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Video Lectures</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Access our collection of video lectures by expert faculty members to enhance your understanding of complex
              topics.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Understanding Organic Reaction Mechanisms",
                subject: "Chemistry",
                duration: "45 minutes",
                image: "/placeholder.svg?height=200&width=400",
                premium: false,
              },
              {
                title: "Solving Complex Integration Problems",
                subject: "Mathematics",
                duration: "60 minutes",
                image: "/placeholder.svg?height=200&width=400",
                premium: false,
              },
              {
                title: "Mastering Electromagnetism Concepts",
                subject: "Physics",
                duration: "55 minutes",
                image: "/placeholder.svg?height=200&width=400",
                premium: true,
              },
            ].map((video, index) => (
              <div key={index} className="bg-background rounded-lg overflow-hidden shadow-sm border">
                <div className="relative h-48">
                  <Image src={video.image || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 bg-primary/90 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary-foreground"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                  {video.premium && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center">
                      <Lock className="h-3 w-3 mr-1" />
                      Premium
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{video.title}</h3>
                  <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                    <span>{video.subject}</span>
                    <span>{video.duration}</span>
                  </div>
                  <div className="mt-4">
                    {video.premium ? (
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/contact">Get Access</Link>
                      </Button>
                    ) : (
                      <Button size="sm" asChild>
                        <Link href="#">Watch Now</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="#">View All Video Lectures</Link>
            </Button>
          </div>
        </section>

        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Get Premium Access</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Unlock all premium study materials, video lectures, and question papers with our premium subscription.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact">Contact for Premium Access</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

