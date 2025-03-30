import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import BatchCard from "@/components/batch-card"

export default function BatchesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection
          title="Our Batches"
          description="Specialized batches designed for different competitive exams and academic needs"
          image="/placeholder.svg?height=400&width=1200"
        />

        <section className="py-12 container">
          <Tabs defaultValue="engineering" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="engineering">Engineering</TabsTrigger>
                <TabsTrigger value="medical">Medical</TabsTrigger>
                <TabsTrigger value="foundation">Foundation</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="engineering" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BatchCard
                  title="JEE Main"
                  description="Comprehensive preparation for JEE Main with focus on NCERT-based concepts and problem-solving."
                  image="/placeholder.svg?height=200&width=400"
                  duration="12 months"
                  students="150"
                  link="/batches/jee-main"
                />
                <BatchCard
                  title="JEE Advanced"
                  description="Intensive coaching for JEE Advanced with advanced problem-solving techniques and strategies."
                  image="/placeholder.svg?height=200&width=400"
                  duration="15 months"
                  students="120"
                  link="/batches/jee-advanced"
                />
                <BatchCard
                  title="BITSAT"
                  description="Specialized preparation for BITSAT with focus on speed and accuracy."
                  image="/placeholder.svg?height=200&width=400"
                  duration="10 months"
                  students="80"
                  link="/batches/bitsat"
                />
                <BatchCard
                  title="Engineering Crash Course"
                  description="Short-term intensive revision course for engineering entrance exams."
                  image="/placeholder.svg?height=200&width=400"
                  duration="3 months"
                  students="60"
                  link="/batches/engineering-crash"
                />
              </div>
            </TabsContent>

            <TabsContent value="medical" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BatchCard
                  title="NEET"
                  description="Complete preparation for NEET with focus on conceptual clarity and application-based questions."
                  image="/placeholder.svg?height=200&width=400"
                  duration="15 months"
                  students="150"
                  link="/batches/neet"
                />
                <BatchCard
                  title="AIIMS"
                  description="Specialized coaching for AIIMS entrance exam with focus on advanced concepts."
                  image="/placeholder.svg?height=200&width=400"
                  duration="15 months"
                  students="100"
                  link="/batches/aiims"
                />
                <BatchCard
                  title="Medical Crash Course"
                  description="Short-term intensive revision course for medical entrance exams."
                  image="/placeholder.svg?height=200&width=400"
                  duration="3 months"
                  students="50"
                  link="/batches/medical-crash"
                />
              </div>
            </TabsContent>

            <TabsContent value="foundation" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BatchCard
                  title="Class 9-10 Foundation"
                  description="Building strong fundamentals for students in classes 9th and 10th for future competitive exams."
                  image="/placeholder.svg?height=200&width=400"
                  duration="24 months"
                  students="200"
                  link="/batches/9-10-foundation"
                />
                <BatchCard
                  title="Class 11-12 Foundation"
                  description="Strengthening concepts for board exams while preparing for competitive exams."
                  image="/placeholder.svg?height=200&width=400"
                  duration="24 months"
                  students="180"
                  link="/batches/11-12-foundation"
                />
                <BatchCard
                  title="Olympiad Preparation"
                  description="Special batch for students preparing for various Olympiads and talent search exams."
                  image="/placeholder.svg?height=200&width=400"
                  duration="6 months"
                  students="40"
                  link="/batches/olympiad"
                />
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Teaching Methodology</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Concept Building</h3>
                      <p className="text-muted-foreground">
                        Strong focus on building fundamental concepts through interactive teaching.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Problem Solving</h3>
                      <p className="text-muted-foreground">
                        Extensive practice with graded problems to develop problem-solving skills.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Regular Assessment</h3>
                      <p className="text-muted-foreground">
                        Weekly tests to evaluate progress and identify areas for improvement.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-primary font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Personalized Attention</h3>
                      <p className="text-muted-foreground">
                        Individual attention to each student to address specific learning needs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Teaching Methodology"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 container">
          <h2 className="text-3xl font-bold text-center mb-8">Batch Schedule</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-3 text-left">Batch Name</th>
                  <th className="border p-3 text-left">Days</th>
                  <th className="border p-3 text-left">Timing</th>
                  <th className="border p-3 text-left">Starting From</th>
                  <th className="border p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">JEE Main</td>
                  <td className="border p-3">Mon, Wed, Fri</td>
                  <td className="border p-3">4:00 PM - 6:30 PM</td>
                  <td className="border p-3">15 June 2023</td>
                  <td className="border p-3">
                    <Button size="sm" asChild>
                      <Link href="/contact">Enroll Now</Link>
                    </Button>
                  </td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border p-3">JEE Advanced</td>
                  <td className="border p-3">Tue, Thu, Sat</td>
                  <td className="border p-3">4:00 PM - 7:00 PM</td>
                  <td className="border p-3">20 June 2023</td>
                  <td className="border p-3">
                    <Button size="sm" asChild>
                      <Link href="/contact">Enroll Now</Link>
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="border p-3">NEET</td>
                  <td className="border p-3">Mon, Wed, Fri</td>
                  <td className="border p-3">5:00 PM - 7:30 PM</td>
                  <td className="border p-3">10 June 2023</td>
                  <td className="border p-3">
                    <Button size="sm" asChild>
                      <Link href="/contact">Enroll Now</Link>
                    </Button>
                  </td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border p-3">Foundation (Class 9-10)</td>
                  <td className="border p-3">Sat, Sun</td>
                  <td className="border p-3">9:00 AM - 1:00 PM</td>
                  <td className="border p-3">1 July 2023</td>
                  <td className="border p-3">
                    <Button size="sm" asChild>
                      <Link href="/contact">Enroll Now</Link>
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="border p-3">Foundation (Class 11-12)</td>
                  <td className="border p-3">Sat, Sun</td>
                  <td className="border p-3">2:00 PM - 6:00 PM</td>
                  <td className="border p-3">1 July 2023</td>
                  <td className="border p-3">
                    <Button size="sm" asChild>
                      <Link href="/contact">Enroll Now</Link>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join Our Batches?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Enroll now to secure your seat in our limited-size batches and start your journey towards academic
              excellence.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact">Contact Us for Enrollment</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

