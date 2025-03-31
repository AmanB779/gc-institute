"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";
import { navigation } from "@/db/data/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load theme preference from localStorage
  useEffect(() => {
    const colorTheme = localStorage.getItem("color-theme");
    if (colorTheme && colorTheme !== "default") {
      document.body.classList.add(`theme-${colorTheme}`);
    }
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-lg dark:bg-background/80" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-2xl font-bold text-primary transition-all duration-300 group-hover:scale-110">GC</span>
          <span className="text-2xl font-bold transition-all duration-300 group-hover:text-primary">Institute</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="outline" size="sm" className="rounded-full hover:bg-primary hover:text-white transition-all duration-300" asChild>
            <Link href="/contact">Enquire Now</Link>
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            asChild
          >
            <Link href="/enroll">Enroll Now</Link>
          </Button>
        </div>
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l-primary/20">
              <nav className="flex flex-col space-y-6 mt-12">
                {navigation.main.map((item) => (
                  <Link key={item.href} href={item.href} className="text-lg font-medium hover:text-primary transition-colors flex items-center">
                    <span className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3">
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
                        className="text-primary"
                      >
                        {item.icon === "home" && (
                          <>
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </>
                        )}
                        {item.icon === "users" && (
                          <>
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </>
                        )}
                        {item.icon === "info" && (
                          <>
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                          </>
                        )}
                        {item.icon === "user" && (
                          <>
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </>
                        )}
                        {item.icon === "trophy" && (
                          <>
                            <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
                            <path d="M15 7a3 3 0 1 0-6 0v2h6V7z" />
                            <circle cx="12" cy="11" r="2" />
                          </>
                        )}
                        {item.icon === "book" && (
                          <>
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                          </>
                        )}
                        {item.icon === "phone" && (
                          <>
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </>
                        )}
                      </svg>
                    </span>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
