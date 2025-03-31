"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, LogOut, BookOpen, GraduationCap, FileText, Settings, Home, BarChart3 } from "lucide-react"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/admin")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <div className="w-64 bg-background border-r border-border hidden md:flex flex-col h-screen sticky top-0">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <span className="text-xl font-bold text-primary">Excel</span>
          <span className="text-xl font-bold">Admin</span>
        </div>

        <nav className="space-y-2">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("overview")}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Overview
          </Button>
          <Button
            variant={activeTab === "enrollments" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("enrollments")}
          >
            <Users className="mr-2 h-4 w-4" />
            Enrollments
          </Button>
          <Button
            variant={activeTab === "batches" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("batches")}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Batches
          </Button>
          <Button
            variant={activeTab === "faculty" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("faculty")}
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            Faculty
          </Button>
          <Button
            variant={activeTab === "content" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("content")}
          >
            <FileText className="mr-2 h-4 w-4" />
            Content
          </Button>
          <Button
            variant={activeTab === "settings" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>
      </div>

      <div className="mt-auto p-4 space-y-2">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Visit Website
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

