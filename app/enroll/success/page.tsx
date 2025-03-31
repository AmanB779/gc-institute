import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function EnrollmentSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container max-w-3xl">
          <div className="bg-background rounded-2xl p-8 md:p-12 shadow-lg border border-border/40 text-center">
            <div className="flex justify-center mb-6">
              <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">Enrollment Submitted Successfully!</h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Thank you for enrolling with Excel Academy. We have received your application and our team will contact
              you shortly to guide you through the next steps.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-muted/30 p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-2">What happens next?</h3>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="h-5 w-5 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs mr-2 mt-0.5">
                      1
                    </span>
                    <span>Our team will review your application</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs mr-2 mt-0.5">
                      2
                    </span>
                    <span>We'll contact you within 24-48 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs mr-2 mt-0.5">
                      3
                    </span>
                    <span>Schedule an assessment/counseling session</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs mr-2 mt-0.5">
                      4
                    </span>
                    <span>Complete the admission process</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/30 p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-2">Contact Information</h3>
                <div className="text-left space-y-2 text-muted-foreground">
                  <p className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary mr-2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>+91 98765 43210</span>
                  </p>
                  <p className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary mr-2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>admissions@excelacademy.com</span>
                  </p>
                  <p className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary mr-2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>123 Education Street, Knowledge Park, Academic City - 123456</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <Link href="/">Return to Home</Link>
              </Button>
              <Button size="lg" className="rounded-full bg-gradient-to-r from-primary to-secondary" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

