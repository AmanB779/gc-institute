"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  School,
  BookOpen,
  FileText,
} from "lucide-react"
import { format } from "date-fns"
import { batches } from "@/db/data/batches"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { toast } from "@/components/ui/use-toast"

interface EnrollmentDetailProps {
  enrollment: any
  onClose: () => void
  onUpdate: () => void
}

export default function EnrollmentDetail({ enrollment, onClose, onUpdate }: EnrollmentDetailProps) {
  const [loading, setLoading] = useState(false)

  if (!enrollment) return null

  const formatDate = (date: any) => {
    if (!date) return "N/A"
    try {
      return format(new Date(date), "PPP")
    } catch (error) {
      return "Invalid date"
    }
  }

  const getBatchName = (batchId: string) => {
    const batch = batches.find((b) => b.id === batchId)
    return batch ? batch.title : batchId
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true)
    try {
      await updateDoc(doc(db, "enrollments", enrollment.id), {
        status: newStatus,
        updatedAt: new Date(),
      })

      toast({
        title: "Status Updated",
        description: `Enrollment status changed to ${newStatus}`,
      })

      onUpdate()
    } catch (error) {
      console.error("Error updating status:", error)
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{enrollment.fullName}</CardTitle>
            <CardDescription>Application submitted on {formatDate(enrollment.createdAt)}</CardDescription>
          </div>
          <div>{getStatusBadge(enrollment.status)}</div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Personal Details</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="course">Course Details</TabsTrigger>
            <TabsTrigger value="notes">Notes & History</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Personal Information</h3>
                  <Separator className="my-2" />
                  <dl className="space-y-2">
                    <div className="flex items-center">
                      <dt className="flex items-center w-32 text-sm">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        Full Name:
                      </dt>
                      <dd className="font-medium">{enrollment.fullName}</dd>
                    </div>
                    <div className="flex items-center">
                      <dt className="flex items-center w-32 text-sm">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        Email:
                      </dt>
                      <dd>{enrollment.email}</dd>
                    </div>
                    <div className="flex items-center">
                      <dt className="flex items-center w-32 text-sm">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        Phone:
                      </dt>
                      <dd>{enrollment.phone}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Parent/Guardian Information</h3>
                  <Separator className="my-2" />
                  <dl className="space-y-2">
                    <div className="flex items-center">
                      <dt className="flex items-center w-32 text-sm">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        Name:
                      </dt>
                      <dd className="font-medium">{enrollment.parentName}</dd>
                    </div>
                    <div className="flex items-center">
                      <dt className="flex items-center w-32 text-sm">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        Phone:
                      </dt>
                      <dd>{enrollment.parentPhone}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Address Information</h3>
                  <Separator className="my-2" />
                  <dl className="space-y-2">
                    <div className="flex items-start">
                      <dt className="flex items-center w-32 text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        Address:
                      </dt>
                      <dd>{enrollment.address}</dd>
                    </div>
                    <div className="flex items-center">
                      <dt className="flex items-center w-32 text-sm">City:</dt>
                      <dd>{enrollment.city}</dd>
                    </div>
                    <div className="flex items-center">
                      <dt className="flex items-center w-32 text-sm">State:</dt>
                      <dd>{enrollment.state}</dd>
                    </div>
                    <div className="flex items-center">
                      <dt className="flex items-center w-32 text-sm">Pincode:</dt>
                      <dd>{enrollment.pincode}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Application Status</h3>
                  <Separator className="my-2" />
                  <dl className="space-y-2">
                    <div className="flex items-center">
                      <dt className="flex items-center w-32 text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        Status:
                      </dt>
                      <dd>{getStatusBadge(enrollment.status)}</dd>
                    </div>
                    <div className="flex items-center">
                      <dt className="flex items-center w-32 text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        Applied On:
                      </dt>
                      <dd>{formatDate(enrollment.createdAt)}</dd>
                    </div>
                    {enrollment.updatedAt && (
                      <div className="flex items-center">
                        <dt className="flex items-center w-32 text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          Last Updated:
                        </dt>
                        <dd>{formatDate(enrollment.updatedAt)}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Current Education</h3>
                <Separator className="my-2" />
                <dl className="space-y-2">
                  <div className="flex items-center">
                    <dt className="flex items-center w-40 text-sm">
                      <School className="h-4 w-4 mr-2 text-muted-foreground" />
                      Current School/College:
                    </dt>
                    <dd className="font-medium">{enrollment.currentSchool}</dd>
                  </div>
                  <div className="flex items-center">
                    <dt className="flex items-center w-40 text-sm">
                      <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                      Current Class/Year:
                    </dt>
                    <dd>Class {enrollment.currentClass}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Additional Information</h3>
                <Separator className="my-2" />
                <dl className="space-y-2">
                  <div className="flex items-center">
                    <dt className="flex items-center w-40 text-sm">How did you hear about us:</dt>
                    <dd className="capitalize">{enrollment.howDidYouHear?.replace("-", " ")}</dd>
                  </div>
                  {enrollment.message && (
                    <div className="flex items-start">
                      <dt className="flex items-center w-40 text-sm">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        Additional Message:
                      </dt>
                      <dd className="bg-muted/30 p-3 rounded-md text-sm">{enrollment.message}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="course" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Course Preferences</h3>
                <Separator className="my-2" />
                <dl className="space-y-2">
                  <div className="flex items-center">
                    <dt className="flex items-center w-40 text-sm">
                      <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                      Interested Batch:
                    </dt>
                    <dd className="font-medium">{getBatchName(enrollment.interestedBatch)}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Batch Assignment</h3>
                <Separator className="my-2" />
                {enrollment.assignedBatch ? (
                  <dl className="space-y-2">
                    <div className="flex items-center">
                      <dt className="flex items-center w-40 text-sm">
                        <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                        Assigned Batch:
                      </dt>
                      <dd className="font-medium">{getBatchName(enrollment.assignedBatch)}</dd>
                    </div>
                    {enrollment.schedule && (
                      <div className="flex items-center">
                        <dt className="flex items-center w-40 text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          Schedule:
                        </dt>
                        <dd>{enrollment.schedule}</dd>
                      </div>
                    )}
                    {enrollment.startDate && (
                      <div className="flex items-center">
                        <dt className="flex items-center w-40 text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          Start Date:
                        </dt>
                        <dd>{enrollment.startDate}</dd>
                      </div>
                    )}
                    {enrollment.notes && (
                      <div className="flex items-start">
                        <dt className="flex items-center w-40 text-sm">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          Notes:
                        </dt>
                        <dd className="bg-muted/30 p-3 rounded-md text-sm">{enrollment.notes}</dd>
                      </div>
                    )}
                  </dl>
                ) : (
                  <p className="text-muted-foreground text-sm">No batch has been assigned yet.</p>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status History</h3>
                <Separator className="my-2" />
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Application Submitted</p>
                      <p className="text-sm text-muted-foreground">{formatDate(enrollment.createdAt)}</p>
                    </div>
                  </div>

                  {enrollment.status !== "pending" && (
                    <div className="flex items-start">
                      <div
                        className={`h-8 w-8 rounded-full ${
                          enrollment.status === "approved" ? "bg-green-100" : "bg-red-100"
                        } flex items-center justify-center mr-3`}
                      >
                        {enrollment.status === "approved" ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          Application {enrollment.status === "approved" ? "Approved" : "Rejected"}
                        </p>
                        <p className="text-sm text-muted-foreground">{formatDate(enrollment.updatedAt)}</p>
                      </div>
                    </div>
                  )}

                  {enrollment.assignedBatch && (
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <BookOpen className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Assigned to {getBatchName(enrollment.assignedBatch)}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(enrollment.updatedAt)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Admin Notes</h3>
                <Separator className="my-2" />
                {enrollment.adminNotes ? (
                  <div className="bg-muted/30 p-3 rounded-md text-sm">{enrollment.adminNotes}</div>
                ) : (
                  <p className="text-muted-foreground text-sm">No admin notes available.</p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <div className="space-x-2">
          {enrollment.status === "pending" && (
            <>
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => handleStatusChange("rejected")}
                disabled={loading}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleStatusChange("approved")}
                disabled={loading}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </>
          )}
          {enrollment.status === "rejected" && (
            <Button onClick={() => handleStatusChange("pending")} disabled={loading}>
              Revert to Pending
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

