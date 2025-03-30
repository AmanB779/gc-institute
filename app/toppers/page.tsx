import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import TopperCard from "@/components/topper-card"

export default function ToppersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection
          title="Our Toppers"
          description="Meet the brilliant minds who achieved extraordinary results with our guidance"
          image="/placeholder.svg?height=400&width=1200"
        />

        <section className="py-12 container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Our Pride, Our Success Stories</h2>
            <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
              At Excel Academy, we take immense pride in the achievements of our students. Their success is a testament
              to their hard work and our effective teaching methodology.
            </p>
          </div>

          <Tabs defaultValue="2023" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="2023">2023</TabsTrigger>
                <TabsTrigger value="2022">2022</TabsTrigger>
                <TabsTrigger value="2021">2021</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="2023" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <TopperCard
                  name="Rahul Sharma"
                  image="/placeholder.svg?height=300&width=300"
                  rank="AIR 12 - JEE Advanced"
                  college="IIT Bombay - Computer Science"
                  testimonial="The faculty at Excel Academy is exceptional. Their teaching methodology and personal attention helped me secure a top rank."
                />
                <TopperCard
                  name="Priya Patel"
                  image="/placeholder.svg?height=300&width=300"
                  rank="AIR 24 - NEET"
                  college="AIIMS Delhi - MBBS"
                  testimonial="The regular tests and detailed analysis of my performance helped me identify and improve my weak areas. Forever grateful to Excel Academy."
                />
                <TopperCard
                  name="Amit Singh"
                  image="/placeholder.svg?height=300&width=300"
                  rank="AIR 45 - JEE Advanced"
                  college="IIT Delhi - Electrical Engineering"
                  testimonial="The study material provided is comprehensive and covers all aspects of the syllabus. The teachers are always available to clear doubts."
                />
                <TopperCard
                  name="Sneha Gupta"
                  image="/placeholder.svg?height=300&width=300"
                  rank="AIR 67 - NEET"
                  college="AIIMS Delhi - MBBS"
                  testimonial="The mock tests and exam strategies taught at Excel Academy were crucial in my preparation. I couldn't have done it without their guidance."
                />
                <TopperCard
                  name="Vikram Reddy"
                  image="/placeholder.svg?height=300&width=300"
                  rank="AIR 78 - JEE Advanced"
                  college="IIT Madras - Mechanical Engineering"
                  testimonial="The faculty's approach to problem-solving and conceptual clarity made a huge difference in my preparation. Thank you, Excel Academy!"
                />
                <TopperCard
                  name="Neha Sharma"
                  image="/placeholder.svg?height=300&width=300"
                  rank="AIR 92 - NEET"
                  college="JIPMER - MBBS"
                  testimonial="The personalized attention and motivation from teachers kept me going during tough times. Excel Academy is not just a coaching institute but a family."
                />
              </div>
            </TabsContent>

            <TabsContent value="2022" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <TopperCard
                  name="Arjun Mehta"
                  image="/placeholder.svg?height=300&width=300"
                  rank="AIR 8 - JEE Advanced"
                  college="IIT Bombay - Computer Science"
                  testimonial="The structured approach to teaching complex topics made them easy to understand. Excel Academy's faculty is truly world-class."
                />
                <TopperCard
                  name="Kavita Desai"
                  image="/placeholder.svg?height=300&width=300"
                  rank="AIR 15 - NEET"
                  college="AIIMS Delhi - MBBS"
                  testimonial="The biology faculty at Excel Academy is exceptional. Their in-depth knowledge and teaching style helped me secure a top rank."
                />
                <TopperCard
                  name="Rajat Verma"
                  image="/placeholder.svg?height=300&width=300"
                  rank="AIR 32 - JEE Advanced"
                  college="IIT Delhi - Computer Science"
                  testimonial="The problem-solving techniques taught at Excel Academy are unmatched. They prepare you not just for the exam but for life."
                />
                <TopperCard
                  name="Ananya Mishra"
                  image="/placeholder.svg?height=300&width=300"
                  rank="AIR 56 - NEET"
                  college="AIIMS Delhi - MBBS"
                  testimonial="The doubt clearing sessions and one-on-one interactions with faculty were instrumental in my success."
                />
                <TopperCard
                  name="Rohan Kapoor"
                  image="/placeholder.svg?height=300&width=300"
                  rank="AIR 65 - JEE Advanced"
                  college="IIT Kanpur - Electrical Engineering"
                  testimonial="The competitive environment at Excel Academy pushed me to give my best every day. The faculty's guidance was invaluable."
                />
                <TopperCard
                  name="Meera Joshi"
                  image="/placeholder.svg?height=300&width=300"
                  rank="AIR 88 - NEET"
                  college="JIPMER - MBBS"
                  testimonial="The test series and performance analysis at Excel Academy helped me track my progress and focus on my weak areas."
                />
              </div>
            </TabsContent>

            <TabsContent value="2021" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <TopperCard
                  name="Varun Malhotra"
                  image="/placeholder.svg?height=300&width=300"
                  rank="AIR 5 - JEE Advanced"
                  college="IIT Bombay - Computer Science"
                  testimonial="The faculty's approach to teaching made even the most complex topics seem simple. Their guidance was crucial in my journey."
                />
                <TopperCard
                  name="Aisha Khan"
                  image="/placeholder.svg?height=300&width=300"
                  rank="AIR 18 - NEET"
                  college="AIIMS Delhi - MBBS"
                  testimonial="The comprehensive study material and regular tests at Excel Academy were key to my success in NEET."
                />
                <TopperCard
                  name="Karan Singhania"
                  image="/placeholder.svg?height=300&width=300"
                  rank="AIR 27 - JEE Advanced"
                  college="IIT Delhi - Mechanical Engineering"
                  testimonial="The physics faculty at Excel Academy is exceptional. Their in-depth knowledge and problem-solving techniques are unmatched."
                />
                <TopperCard
                  name="Riya Sharma"
                  image="/placeholder.svg?height=300&width=300"
                  rank="AIR 42 - NEET"
                  college="AIIMS Delhi - MBBS"
                  testimonial="The biology faculty's approach to teaching made memorizing complex concepts easy. Their guidance was invaluable."
                />
                <TopperCard
                  name="Aditya Patel"
                  image="/placeholder.svg?height=300&width=300"
                  rank="AIR 58 - JEE Advanced"
                  college="IIT Madras - Computer Science"
                  testimonial="The mathematics faculty at Excel Academy is world-class. Their problem-solving techniques and shortcuts are game-changers."
                />
                <TopperCard
                  name="Nisha Reddy"
                  image="/placeholder.svg?height=300&width=300"
                  rank="AIR 75 - NEET"
                  college="JIPMER - MBBS"
                  testimonial="The chemistry faculty's approach to teaching organic chemistry made it my strongest subject. Thank you, Excel Academy!"
                />
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Success Stories"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Success Metrics</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">JEE Advanced 2023</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Students in Top 100</span>
                        <span className="font-bold">15</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">NEET 2023</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Students in Top 100</span>
                        <span className="font-bold">12</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Overall Selection Rate</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Students Selected in Top Colleges</span>
                        <span className="font-bold">85%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Toppers' Gallery</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Celebrating the achievements of our brilliant students who have made us proud with their exceptional
              performance in various competitive exams.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=300&width=300&text=Topper ${item}`}
                  alt={`Topper ${item}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/gallery">View Full Gallery</Link>
            </Button>
          </div>
        </section>

        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Want to Be Our Next Topper?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Join Excel Academy today and take the first step towards achieving your academic dreams. Our proven
              methodology and expert faculty are here to guide you.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact">Enroll Now</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

