import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Linkedin, Twitter, Facebook, Quote } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import { founder } from "@/db/data/founder";

export default function FounderPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection title="Meet Our Founder" description="The visionary behind GC Institute's success story" image="/placeholder.svg?height=400&width=1200" />

        <section className="py-16 container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <Image src={founder.image || "/founder.jpeg"} alt={founder.name} fill className="object-contain" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-70"></div>
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-70 animation-delay-2000"></div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{founder.name}</h1>
                <p className="text-xl text-primary font-medium">{founder.position}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                {founder.education.map((edu, index) => (
                  <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {edu}
                  </span>
                ))}
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">{founder.experience}</span>
              </div>

              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg leading-relaxed">{founder.journey.split(".")[0] + "."}</p>
                <p className="leading-relaxed">{founder.journey.split(".").slice(1).join(".")}</p>
              </div>

              <div className="flex space-x-4 pt-4">
                <Link href={founder.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Linkedin className="h-5 w-5 text-primary" />
                  </Button>
                </Link>
                <Link href={founder.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Twitter className="h-5 w-5 text-primary" />
                  </Button>
                </Link>
                <Link href={founder.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Facebook className="h-5 w-5 text-primary" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-white to-primary/5 dark:from-background dark:to-primary/5">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Vision & <span className="gradient-text">Mission</span>
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">The guiding principles that drive GC Institute's commitment to educational excellence</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background rounded-xl p-8 shadow-sm border border-border/40 hover-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full"></div>
                <h3 className="text-2xl font-bold mb-4 relative z-10">Vision</h3>
                <p className="text-muted-foreground mb-6 relative z-10">{founder.vision}</p>
                <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
              </div>

              <div className="bg-background rounded-xl p-8 shadow-sm border border-border/40 hover-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full"></div>
                <h3 className="text-2xl font-bold mb-4 relative z-10">Mission</h3>
                <p className="text-muted-foreground mb-6 relative z-10">{founder.mission}</p>
                <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Teaching <span className="gradient-text">Philosophy</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">{founder.philosophy}</p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Achievements</h3>
                <ul className="space-y-3">
                  {founder.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">
                Inspiring <span className="gradient-text">Quotes</span>
              </h2>

              {founder.quotes.map((quote, index) => (
                <div key={index} className="bg-background rounded-xl p-6 shadow-sm border border-border/40 hover-card relative">
                  <Quote className="h-8 w-8 text-primary/20 absolute top-4 left-4" />
                  <p className="text-lg font-medium italic pl-8 pr-4 py-2">"{quote}"</p>
                  <div className="mt-2 text-right">
                    <p className="text-primary font-medium">— {founder.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-float animation-delay-2000"></div>
          </div>

          <div className="container text-center relative z-10">
            <h2 className="text-4xl font-bold mb-4">Join GC Institute Today</h2>
            <p className="max-w-2xl mx-auto mb-10 text-white/90">
              Be a part of the educational journey envisioned by {founder.name} and take the first step towards academic excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button variant="secondary" size="lg" className="rounded-full hover:shadow-lg hover:shadow-white/20 transition-all duration-300" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-primary transition-all duration-300"
                asChild
              >
                <Link href="/enroll">Enroll Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
