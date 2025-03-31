"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import { contactInfo } from "@/db/data/contact";
import { faqs } from "@/db/data/faq";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection
          title="Contact Us"
          description="Get in touch with us for any queries or to schedule a visit"
          image="/hero-slide-1.jpg?height=400&width=1200"
        />

        <section className="py-20">
          <div className="container">
            <h1 className="text-4xl font-bold text-center mb-4">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Get in touch with us for any queries about our courses, admissions, or general information.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="bg-muted/30 p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Phone</h4>
                        <p className="text-muted-foreground mt-1">{contactInfo.phone.primary}</p>
                        <p className="text-muted-foreground">{contactInfo.phone.secondary}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p className="text-muted-foreground mt-1">{contactInfo.email.primary}</p>
                        <p className="text-muted-foreground">{contactInfo.email.secondary}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Address</h4>
                        <p className="text-muted-foreground mt-1">
                          {contactInfo.address.street}, {contactInfo.address.area},
                          <br />
                          {contactInfo.address.city} - {contactInfo.address.pincode}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Office Hours</h4>
                        <p className="text-muted-foreground mt-1">{contactInfo.officeHours.weekday}</p>
                        <p className="text-muted-foreground">{contactInfo.officeHours.weekend}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-medium mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                      <Link
                        href={contactInfo.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 w-10 bg-background rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                      </Link>
                      <Link
                        href={contactInfo.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 w-10 bg-background rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      </Link>
                      <Link
                        href={contactInfo.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 w-10 bg-background rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                      </Link>
                      <Link
                        href={contactInfo.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 w-10 bg-background rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </Link>
                      <Link
                        href={contactInfo.socialMedia.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 w-10 bg-background rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-lg overflow-hidden h-[300px] relative">
                  <iframe
                    src={contactInfo.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    title="Excel Academy Location"
                  ></iframe>
                </div>
              </div>

              <div className="bg-muted/30 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input type="text" id="name" name="name" className="w-full px-4 py-2 rounded-md border bg-background" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input type="email" id="email" name="email" className="w-full px-4 py-2 rounded-md border bg-background" required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone
                    </label>
                    <input type="tel" id="phone" name="phone" className="w-full px-4 py-2 rounded-md border bg-background" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea id="message" name="message" rows={4} className="w-full px-4 py-2 rounded-md border bg-background" required></textarea>
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-background p-6 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join Excel Academy?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Take the first step towards academic excellence and a successful career. Contact us today to schedule a visit or to know more about our courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact">Schedule a Visit</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white hover:bg-white hover:text-primary" asChild>
                <Link href="/batches">Explore Courses</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
