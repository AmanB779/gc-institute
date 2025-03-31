"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { signOut } from "firebase/auth";
import { collection, getDocs, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import {
  Users,
  LogOut,
  BookOpen,
  GraduationCap,
  FileText,
  Settings,
  Home,
  BarChart3,
  Loader2,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Bell,
  Activity,
  Menu,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { batches } from "@/db/data/batches";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import BatchDetails from "@/components/admin/batch-details";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "firebase/auth";

interface Enrollment {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  interestedBatch: string;
  assignedBatch?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt?: Date;
  schedule?: string;
  startDate?: string;
  notes?: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState<Enrollment[]>([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [batchFilter, setBatchFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBatch, setSelectedBatch] = useState(batches[0]?.id || "");
  const [stats, setStats] = useState({
    totalEnrollments: 0,
    pendingEnrollments: 0,
    approvedEnrollments: 0,
    rejectedEnrollments: 0,
    todayEnrollments: 0,
    weeklyEnrollments: 0,
  });
  const [batchStats, setBatchStats] = useState<Record<string, number>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    batchId: "",
    schedule: "",
    startDate: "",
    notes: "",
  });
  const router = useRouter();
  const itemsPerPage = 10;

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (!user) {
        router.push("/admin");
      } else {
        setUser(user);
        fetchData();
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    filterEnrollments();
  }, [searchTerm, statusFilter, batchFilter, enrollments]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch all enrollments
      const enrollmentsQuery = query(collection(db, "enrollments"), orderBy("createdAt", "desc"));
      const enrollmentsSnapshot = await getDocs(enrollmentsQuery);
      const enrollmentsData: Enrollment[] = enrollmentsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          interestedBatch: data.interestedBatch || "",
          assignedBatch: data.assignedBatch,
          status: (data.status || "pending") as "pending" | "approved" | "rejected",
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate(),
          schedule: data.schedule,
          startDate: data.startDate,
          notes: data.notes,
        };
      });
      setEnrollments(enrollmentsData);

      // Calculate stats
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      const todayEnrollments = enrollmentsData.filter((e) => new Date(e.createdAt) >= today).length;
      const weeklyEnrollments = enrollmentsData.filter((e) => new Date(e.createdAt) >= weekAgo).length;

      // Calculate batch stats
      const batchCounts: Record<string, number> = {};
      enrollmentsData.forEach((enrollment) => {
        if (enrollment.status === "approved" && enrollment.assignedBatch) {
          batchCounts[enrollment.assignedBatch] = (batchCounts[enrollment.assignedBatch] || 0) + 1;
        }
      });
      setBatchStats(batchCounts);

      setStats({
        totalEnrollments: enrollmentsData.length,
        pendingEnrollments: enrollmentsData.filter((e) => e.status === "pending").length,
        approvedEnrollments: enrollmentsData.filter((e) => e.status === "approved").length,
        rejectedEnrollments: enrollmentsData.filter((e) => e.status === "rejected").length,
        todayEnrollments,
        weeklyEnrollments,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterEnrollments = () => {
    let filtered = [...enrollments];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (e) =>
          e.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.phone?.includes(searchTerm)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((e) => e.status === statusFilter);
    }

    // Apply batch filter
    if (batchFilter !== "all") {
      filtered = filtered.filter((e) => e.assignedBatch === batchFilter || (batchFilter === "unassigned" && !e.assignedBatch));
    }

    setFilteredEnrollments(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const getPaginatedEnrollments = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredEnrollments.slice(startIndex, endIndex);
  };

  const handleStatusChange = async (enrollmentId: string, newStatus: "pending" | "approved" | "rejected") => {
    try {
      await updateDoc(doc(db, "enrollments", enrollmentId), {
        status: newStatus,
        updatedAt: new Date(),
      });

      // Update local state
      setEnrollments((prev) => prev.map((e) => (e.id === enrollmentId ? { ...e, status: newStatus, updatedAt: new Date() } : e)));

      toast({
        title: "Status Updated",
        description: `Enrollment status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleAssignBatch = async () => {
    if (!selectedEnrollment || !assignmentData.batchId) {
      toast({
        title: "Error",
        description: "Please select a batch",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateDoc(doc(db, "enrollments", selectedEnrollment.id), {
        assignedBatch: assignmentData.batchId,
        schedule: assignmentData.schedule,
        startDate: assignmentData.startDate,
        notes: assignmentData.notes,
        status: "approved",
        updatedAt: new Date(),
      });

      // Update local state
      setEnrollments((prev) =>
        prev.map((e) =>
          e.id === selectedEnrollment.id
            ? {
                ...e,
                assignedBatch: assignmentData.batchId,
                schedule: assignmentData.schedule,
                startDate: assignmentData.startDate,
                notes: assignmentData.notes,
                status: "approved",
                updatedAt: new Date(),
              }
            : e
        )
      );

      toast({
        title: "Batch Assigned",
        description: `Student has been assigned to a batch successfully`,
      });

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error assigning batch:", error);
      toast({
        title: "Error",
        description: "Failed to assign batch",
        variant: "destructive",
      });
    }
  };

  const openAssignDialog = (enrollment: any) => {
    setSelectedEnrollment(enrollment);
    setAssignmentData({
      batchId: enrollment.assignedBatch || "",
      schedule: enrollment.schedule || "",
      startDate: enrollment.startDate || "",
      notes: enrollment.notes || "",
    });
    setIsDialogOpen(true);
  };

  const formatDate = (date: Date) => {
    if (!date) return "N/A";
    return format(new Date(date), "MMM dd, yyyy");
  };

  const getBatchName = (batchId: string) => {
    const batch = batches.find((b) => b.id === batchId);
    return batch ? batch.title : batchId;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Clear the admin cookie
      document.cookie = "adminLoggedIn=false;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
      // Redirect to login page
      router.push("/admin");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-background border-r border-border hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-8">
            <span className="text-xl font-bold text-primary">Excel</span>
            <span className="text-xl font-bold">Admin</span>
          </div>

          <nav className="space-y-2">
            <Button variant={activeTab === "overview" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("overview")}>
              <BarChart3 className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button variant={activeTab === "enrollments" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("enrollments")}>
              <Users className="mr-2 h-4 w-4" />
              Enrollments
            </Button>
            <Button variant={activeTab === "batches" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("batches")}>
              <BookOpen className="mr-2 h-4 w-4" />
              Batches
            </Button>
            <Button variant={activeTab === "faculty" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("faculty")}>
              <GraduationCap className="mr-2 h-4 w-4" />
              Faculty
            </Button>
            <Button variant={activeTab === "content" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("content")}>
              <FileText className="mr-2 h-4 w-4" />
              Content
            </Button>
            <Button variant={activeTab === "settings" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("settings")}>
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

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="border-b sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center px-4 md:px-6">
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>

            <div className="flex items-center ml-auto space-x-4">
              <div className="relative hidden md:flex items-center">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="pl-8 md:w-[200px] lg:w-[300px] bg-background" />
              </div>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
              </Button>

              <div className="relative h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">{user?.email?.substring(0, 2).toUpperCase() || "AD"}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-6 md:w-fit">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
              <TabsTrigger value="batches">Batches</TabsTrigger>
              <TabsTrigger value="faculty">Faculty</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalEnrollments}</div>
                    <p className="text-xs text-muted-foreground">All time enrollments</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Enrollments</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.pendingEnrollments}</div>
                    <p className="text-xs text-muted-foreground">Awaiting review</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Today's Enrollments</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.todayEnrollments}</div>
                    <p className="text-xs text-muted-foreground">New enrollments today</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Weekly Enrollments</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.weeklyEnrollments}</div>
                    <p className="text-xs text-muted-foreground">Last 7 days</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid gap-4 md:grid-cols-2"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Batch Enrollment Statistics</CardTitle>
                    <CardDescription>Number of students enrolled in each batch</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {Object.keys(batchStats).length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">No batch assignments yet</p>
                    ) : (
                      <div className="space-y-4">
                        {Object.entries(batchStats).map(([batchId, count]) => (
                          <div key={batchId} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">{getBatchName(batchId)}</span>
                              <span>{count} students</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div
                                className="bg-primary h-2.5 rounded-full"
                                style={{ width: `${Math.min((count / stats.approvedEnrollments) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Enrollment Status</CardTitle>
                    <CardDescription>Overview of enrollment application statuses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Approved</span>
                          <span>{stats.approvedEnrollments} enrollments</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: `${(stats.approvedEnrollments / stats.totalEnrollments) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Pending</span>
                          <span>{stats.pendingEnrollments} enrollments</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-yellow-500 h-2.5 rounded-full"
                            style={{ width: `${(stats.pendingEnrollments / stats.totalEnrollments) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Rejected</span>
                          <span>{stats.rejectedEnrollments} enrollments</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-red-500 h-2.5 rounded-full"
                            style={{ width: `${(stats.rejectedEnrollments / stats.totalEnrollments) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Enrollments</CardTitle>
                    <CardDescription>Latest enrollment applications received</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="flex justify-center items-center h-40">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    ) : enrollments.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">No enrollments found</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-2">Name</th>
                              <th className="text-left py-3 px-2">Course</th>
                              <th className="text-left py-3 px-2">Date</th>
                              <th className="text-left py-3 px-2">Status</th>
                              <th className="text-left py-3 px-2">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <AnimatePresence>
                              {enrollments.slice(0, 5).map((enrollment, index) => (
                                <motion.tr
                                  key={enrollment.id}
                                  className="border-b"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.2, delay: index * 0.05 }}
                                >
                                  <td className="py-3 px-2">{enrollment.fullName}</td>
                                  <td className="py-3 px-2">{enrollment.interestedBatch}</td>
                                  <td className="py-3 px-2">{formatDate(enrollment.createdAt)}</td>
                                  <td className="py-3 px-2">{getStatusBadge(enrollment.status)}</td>
                                  <td className="py-3 px-2">
                                    <div className="flex space-x-2">
                                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openAssignDialog(enrollment)}>
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      {enrollment.status === "pending" && (
                                        <>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-green-500 hover:text-green-700"
                                            onClick={() => handleStatusChange(enrollment.id, "approved")}
                                          >
                                            <CheckCircle className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-red-500 hover:text-red-700"
                                            onClick={() => handleStatusChange(enrollment.id, "rejected")}
                                          >
                                            <XCircle className="h-4 w-4" />
                                          </Button>
                                        </>
                                      )}
                                    </div>
                                  </td>
                                </motion.tr>
                              ))}
                            </AnimatePresence>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Enrollments Tab */}
            <TabsContent value="enrollments">
              <Card>
                <CardHeader>
                  <CardTitle>Enrollment Management</CardTitle>
                  <CardDescription>Manage all enrollment applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search by name, email or phone..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>

                      <div className="flex gap-4">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select value={batchFilter} onValueChange={setBatchFilter}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by batch" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Batches</SelectItem>
                            <SelectItem value="unassigned">Unassigned</SelectItem>
                            {batches.map((batch) => (
                              <SelectItem key={batch.id} value={batch.id}>
                                {batch.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Enrollments Table */}
                    {loading ? (
                      <div className="flex justify-center items-center h-40">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    ) : filteredEnrollments.length === 0 ? (
                      <div className="text-center py-8 border rounded-lg">
                        <p className="text-muted-foreground">No enrollments found</p>
                      </div>
                    ) : (
                      <>
                        <div className="overflow-x-auto border rounded-lg">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-muted/50">
                                <th className="text-left py-3 px-4">Name</th>
                                <th className="text-left py-3 px-4">Contact</th>
                                <th className="text-left py-3 px-4">Interested Course</th>
                                <th className="text-left py-3 px-4">Assigned Batch</th>
                                <th className="text-left py-3 px-4">Date</th>
                                <th className="text-left py-3 px-4">Status</th>
                                <th className="text-left py-3 px-4">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <AnimatePresence>
                                {getPaginatedEnrollments().map((enrollment, index) => (
                                  <motion.tr
                                    key={enrollment.id}
                                    className="border-t hover:bg-muted/20"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                  >
                                    <td className="py-3 px-4 font-medium">{enrollment.fullName}</td>
                                    <td className="py-3 px-4">
                                      <div>{enrollment.email}</div>
                                      <div className="text-sm text-muted-foreground">{enrollment.phone}</div>
                                    </td>
                                    <td className="py-3 px-4">{enrollment.interestedBatch}</td>
                                    <td className="py-3 px-4">
                                      {enrollment.assignedBatch ? (
                                        <div>
                                          <div>{getBatchName(enrollment.assignedBatch)}</div>
                                          {enrollment.schedule && (
                                            <div className="text-sm text-muted-foreground flex items-center">
                                              <Clock className="h-3 w-3 mr-1" /> {enrollment.schedule}
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <span className="text-muted-foreground text-sm">Not assigned</span>
                                      )}
                                    </td>
                                    <td className="py-3 px-4">{formatDate(enrollment.createdAt)}</td>
                                    <td className="py-3 px-4">{getStatusBadge(enrollment.status)}</td>
                                    <td className="py-3 px-4">
                                      <div className="flex space-x-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openAssignDialog(enrollment)}>
                                          <Edit className="h-4 w-4" />
                                        </Button>
                                        {enrollment.status === "pending" && (
                                          <>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="h-8 w-8 text-green-500 hover:text-green-700"
                                              onClick={() => handleStatusChange(enrollment.id, "approved")}
                                            >
                                              <CheckCircle className="h-4 w-4" />
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="h-8 w-8 text-red-500 hover:text-red-700"
                                              onClick={() => handleStatusChange(enrollment.id, "rejected")}
                                            >
                                              <XCircle className="h-4 w-4" />
                                            </Button>
                                          </>
                                        )}
                                      </div>
                                    </td>
                                  </motion.tr>
                                ))}
                              </AnimatePresence>
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination */}
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                              />
                            </PaginationItem>

                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                              const pageNumber = i + 1;
                              return (
                                <PaginationItem key={pageNumber}>
                                  <PaginationLink isActive={currentPage === pageNumber} onClick={() => setCurrentPage(pageNumber)}>
                                    {pageNumber}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            })}

                            {totalPages > 5 && (
                              <>
                                <PaginationItem>
                                  <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                  <PaginationLink isActive={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>
                                    {totalPages}
                                  </PaginationLink>
                                </PaginationItem>
                              </>
                            )}

                            <PaginationItem>
                              <PaginationNext
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Batches Tab */}
            <TabsContent value="batches">
              <Card>
                <CardHeader>
                  <CardTitle>Batch Management</CardTitle>
                  <CardDescription>View and manage students in each batch</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                      <SelectTrigger className="w-full md:w-[300px]">
                        <SelectValue placeholder="Select a batch to view" />
                      </SelectTrigger>
                      <SelectContent>
                        {batches.map((batch) => (
                          <SelectItem key={batch.id} value={batch.id}>
                            {batch.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <BatchDetails batchId={selectedBatch} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Assign Batch Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assign Batch to Student</DialogTitle>
            <DialogDescription>Assign {selectedEnrollment?.fullName} to a batch and set their schedule.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="batch">Select Batch</Label>
              <Select value={assignmentData.batchId} onValueChange={(value) => setAssignmentData({ ...assignmentData, batchId: value })}>
                <SelectTrigger id="batch">
                  <SelectValue placeholder="Select a batch" />
                </SelectTrigger>
                <SelectContent>
                  {batches.map((batch) => (
                    <SelectItem key={batch.id} value={batch.id}>
                      {batch.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule">Schedule</Label>
              <Input
                id="schedule"
                placeholder="e.g. Mon, Wed, Fri (4:00 PM - 6:30 PM)"
                value={assignmentData.schedule}
                onChange={(e) => setAssignmentData({ ...assignmentData, schedule: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                placeholder="e.g. June 15, 2023"
                value={assignmentData.startDate}
                onChange={(e) => setAssignmentData({ ...assignmentData, startDate: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any special instructions or notes"
                value={assignmentData.notes}
                onChange={(e) => setAssignmentData({ ...assignmentData, notes: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignBatch}>Assign & Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
}
