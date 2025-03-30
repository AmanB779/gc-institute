import Link from "next/link"
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HomeSlider from "@/components/home-slider"
import TestimonialCard from "@/components/testimonial-card"
import BatchCard from "@/components/batch-card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Slider Section */}
        <section className="w-full">
          <HomeSlider />
        </section>

        {/* Quick Stats */}
        <section className="bg-gradient-to-r from-primary/5 to-secondary/5 py-16">
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-primary/10 hover-card">
              <h3 className="text-5xl font-bold gradient-text mb-2">1200+</h3>
              <p className="text-muted-foreground">Students Enrolled</p>
            </div>
            <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-primary/10 hover-card">
              <h3 className="text-5xl font-bold gradient-text mb-2">95%</h3>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
            <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-primary/10 hover-card">
              <h3 className="text-5xl font-bold gradient-text mb-2">50+</h3>
              <p className="text-muted-foreground">Expert Teachers</p>
            </div>
            <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-primary/10 hover-card">
              <h3 className="text-5xl font-bold gradient-text mb-2">15+</h3>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </section>

        {/* Featured Batches */}
        <section className="py-20 container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Our <span className="gradient-text">Featured Batches</span>
              </h2>
              <p className="text-muted-foreground">Join our specialized batches for guaranteed success</p>
            </div>
            <Link href="/batches" className="mt-4 md:mt-0 flex items-center text-primary hover:underline group">
              View All Batches{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BatchCard
              title="JEE Advanced"
              description="Comprehensive preparation for JEE Advanced with focus on problem-solving techniques."
              image="/placeholder.svg?height=200&width=400"
              duration="12 months"
              students="120"
              link="/batches/jee-advanced"
            />
            <BatchCard
              title="NEET Preparation"
              description="Complete syllabus coverage with regular tests and personalized feedback."
              image="/placeholder.svg?height=200&width=400"
              duration="15 months"
              students="150"
              link="/batches/neet"
            />
            <BatchCard
              title="Foundation Course"
              description="Build strong fundamentals for students in classes 9th and 10th."
              image="/placeholder.svg?height=200&width=400"
              duration="24 months"
              students="200"
              link="/batches/foundation"
            />
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gradient-to-b from-white to-primary/5">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-4">
              Why <span className="gradient-text">Choose Us</span>
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              We provide a comprehensive learning experience with expert faculty and proven methodology
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-xl shadow-sm border border-border/40 hover-card group">
                <div className="h-14 w-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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
                    className="text-primary"
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  Expert Faculty
                </h3>
                <p className="text-muted-foreground">
                  Learn from experienced teachers who are experts in their fields with proven track records.
                </p>
              </div>
              <div className="bg-background p-6 rounded-xl shadow-sm border border-border/40 hover-card group">
                <div className="h-14 w-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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
                    className="text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  Proven Results
                </h3>
                <p className="text-muted-foreground">
                  Our consistent track record of producing top rankers in various competitive exams speaks for itself.
                </p>
              </div>
              <div className="bg-background p-6 rounded-xl shadow-sm border border-border/40 hover-card group">
                <div className="h-14 w-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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
                    className="text-primary"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  Regular Assessment
                </h3>
                <p className="text-muted-foreground">
                  Weekly tests and detailed performance analysis to track progress and improve weak areas.
                </p>
              </div>
              <div className="bg-background p-6 rounded-xl shadow-sm border border-border/40 hover-card group">
                <div className="h-14 w-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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
                    className="text-primary"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  Small Batch Size
                </h3>
                <p className="text-muted-foreground">
                  Limited students per batch to ensure personalized attention and better learning outcomes.
                </p>
              </div>
              <div className="bg-background p-6 rounded-xl shadow-sm border border-border/40 hover-card group">
                <div className="h-14 w-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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
                    className="text-primary"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  Comprehensive Study Material
                </h3>
                <p className="text-muted-foreground">
                  Well-researched and regularly updated study materials designed by subject experts.
                </p>
              </div>
              <div className="bg-background p-6 rounded-xl shadow-sm border border-border/40 hover-card group">
                <div className="h-14 w-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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
                    className="text-primary"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M12 18v-6" />
                    <path d="M8 15h8" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  Doubt Clearing Sessions
                </h3>
                <p className="text-muted-foreground">
                  Regular doubt clearing sessions to ensure no concept remains unclear.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 container">
          <h2 className="text-3xl font-bold text-center mb-4">
            What Our <span className="gradient-text">Students Say</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Hear from our successful students who achieved their dreams with our guidance
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="Rahul Sharma"
              image="/placeholder.svg?height=100&width=100"
              rank="AIR 45 - JEE Advanced"
              testimonial="The faculty at Excel Academy is exceptional. Their teaching methodology and personal attention helped me secure a top rank."
            />
            <TestimonialCard
              name="Priya Patel"
              image="/placeholder.svg?height=100&width=100"
              rank="AIR 78 - NEET"
              testimonial="The regular tests and detailed analysis of my performance helped me identify and improve my weak areas. Forever grateful to Excel Academy."
            />
            <TestimonialCard
              name="Amit Singh"
              image="/placeholder.svg?height=100&width=100"
              rank="AIR 120 - JEE Advanced"
              testimonial="The study material provided is comprehensive and covers all aspects of the syllabus. The teachers are always available to clear doubts."
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-float animation-delay-2000"></div>
          </div>

          <div className="container text-center relative z-10">
            <h2 className="text-4xl font-bold mb-4">Ready to Excel in Your Academics?</h2>
            <p className="max-w-2xl mx-auto mb-10 text-white/90">
              Join Excel Academy today and take the first step towards academic excellence and a successful career.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-primary transition-all duration-300"
                asChild
              >
                <Link href="/batches">Explore Batches</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Contact */}
        <section className="py-16 bg-gradient-to-b from-white to-primary/5">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center p-6 bg-background rounded-xl shadow-sm border border-border/40 hover-card">
                <div className="h-14 w-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mr-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Call Us</h3>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center p-6 bg-background rounded-xl shadow-sm border border-border/40 hover-card">
                <div className="h-14 w-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mr-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Email Us</h3>
                  <p className="text-muted-foreground">info@excelacademy.com</p>
                </div>
              </div>
              <div className="flex items-center p-6 bg-background rounded-xl shadow-sm border border-border/40 hover-card">
                <div className="h-14 w-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Visit Us</h3>
                  <p className="text-muted-foreground">123 Education St., Knowledge City</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

