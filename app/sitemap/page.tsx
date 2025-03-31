"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { navigation } from "@/db/data/navigation";

export default function SitemapPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-20">
        <div className="container">
          <h1 className="text-4xl font-bold text-center mb-4">
            Site <span className="gradient-text">Map</span>
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">Explore all the pages and sections of our website</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Public Links */}
            <Card className="hover-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Public Pages</CardTitle>
                <CardDescription>Main website pages accessible to all visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {navigation.public.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="flex items-center text-muted-foreground hover:text-primary transition-colors group">
                        <ArrowRight className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Admin Links */}
            <Card className="hover-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Admin Area</CardTitle>
                <CardDescription>Administrative pages for managing the website</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {navigation.admin.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="flex items-center text-muted-foreground hover:text-primary transition-colors group">
                        <ArrowRight className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
