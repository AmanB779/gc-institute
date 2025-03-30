import Link from "next/link"
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-primary/5 to-background border-t">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-2xl font-bold text-primary transition-all duration-300 group-hover:scale-110">
                Excel
              </span>
              <span className="text-2xl font-bold transition-all duration-300 group-hover:text-primary">Academy</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Empowering students to achieve academic excellence and build a successful career through quality education
              and personalized guidance.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link
                href="#"
                className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
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
                href="#"
                className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
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
                href="#"
                className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
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
                href="#"
                className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
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
          <div>
            <h3 className="font-bold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <ArrowRight className="h-3 w-0 mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2 text-primary" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/batches"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <ArrowRight className="h-3 w-0 mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2 text-primary" />
                  Batches
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <ArrowRight className="h-3 w-0 mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2 text-primary" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/toppers"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <ArrowRight className="h-3 w-0 mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2 text-primary" />
                  Toppers
                </Link>
              </li>
              <li>
                <Link
                  href="/notes"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <ArrowRight className="h-3 w-0 mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2 text-primary" />
                  Notes
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <ArrowRight className="h-3 w-0 mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2 text-primary" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-6 relative inline-block">
              Our Courses
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/batches/jee-main"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <ArrowRight className="h-3 w-0 mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2 text-primary" />
                  JEE Main
                </Link>
              </li>
              <li>
                <Link
                  href="/batches/jee-advanced"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <ArrowRight className="h-3 w-0 mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2 text-primary" />
                  JEE Advanced
                </Link>
              </li>
              <li>
                <Link
                  href="/batches/neet"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <ArrowRight className="h-3 w-0 mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2 text-primary" />
                  NEET
                </Link>
              </li>
              <li>
                <Link
                  href="/batches/foundation-9-10"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <ArrowRight className="h-3 w-0 mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2 text-primary" />
                  Foundation (Class 9-10)
                </Link>
              </li>
              <li>
                <Link
                  href="/batches/foundation-11-12"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <ArrowRight className="h-3 w-0 mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2 text-primary" />
                  Foundation (Class 11-12)
                </Link>
              </li>
              <li>
                <Link
                  href="/batches/olympiad"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <ArrowRight className="h-3 w-0 mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2 text-primary" />
                  Olympiad Preparation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="text-muted-foreground">
                  123 Education Street, Knowledge Park,
                  <br />
                  Academic City - 123456
                </span>
              </li>
              <li className="flex items-center">
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span className="text-muted-foreground">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span className="text-muted-foreground">info@excelacademy.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t py-6">
        <div className="container flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Excel Academy. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link
              href="/terms-conditions"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

