"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Eye, Edit, Trash2, GraduationCap, Plus } from "lucide-react"
import { batches } from "@/db/data/batches"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { format } from "date-fns"

export default function BatchManagement() {
  const [selectedBatch, setSelectedBatch] = useState(batches[0]?.id || "")
  const [enrolledStudents, setEnrolledStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (selectedBatch) {
      fetchEnrolledStudents(selectedBatch)
    }
  }, [selectedBatch])

  const fetchEnrolledStudents = async (batchId: string) => {
    setLoading(true)
    try {
      const studentsQuery = query(
        collection(db, "enrollments"),
        where("assignedBatch", "==", batchId),
        where("status", "==", "approved"),
      )

      const studentsSnapshot = await getDocs(studentsQuery)
      const studentsData = studentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setEnrolledStudents(studentsData)
    } catch (error) {
      console.error("Error fetching enrolled students:", error)
    } finally {
      setLoading(false)
    }
  }

  const getSelectedBatch = () => {
    return batches.find((batch) => batch.id === selectedBatch)
  }

  const batch = getSelectedBatch()

  const filteredStudents = enrolledStudents.filter(
    (student) =>
      student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone?.includes(searchTerm),
  )

  const formatDate = (date: any) => {
    if (!date) return "N/A"
    try {
      return format(new Date(date), "MMM dd, yyyy")
    } catch (error) {
      return "Invalid date"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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

        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Batch
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Batch Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Title:</span>
                <span className="font-medium">{batch?.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Duration:</span>
                <span>{batch?.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Capacity:</span>
                <span>{batch?.students} students</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Enrolled:</span>
                <span className="text-primary font-medium">{enrolledStudents.length} students</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Available:</span>
                <span className="text-green-600">
                  {Math.max(0, Number.parseInt(batch?.students || "0") - enrolledStudents.length)} seats
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Days:</span>
                <span>{batch?.details?.schedule?.days || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Timing:</span>
                <span>{batch?.details?.schedule?.timing || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Start Date:</span>
                <span>{batch?.details?.schedule?.startDate || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Fee:</span>
                <span className="font-medium">{batch?.details?.fee || "N/A"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Faculty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Dr. Rajesh Kumar</div>
                  <div className="text-xs text-muted-foreground">Physics</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Prof. Anita Sharma</div>
                  <div className="text-xs text-muted-foreground">Chemistry</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Dr. Sunil Verma</div>
                  <div className="text-xs text-muted-foreground">Mathematics</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted/50 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h3 className="font-medium">Enrolled Students ({enrolledStudents.length})</h3>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <Input
              placeholder="Search students..."
              className="w-full md:w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No students enrolled in this batch</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Contact</th>
                  <th className="text-left py-3 px-4">Enrollment Date</th>
                  <th className="text-left py-3 px-4">Schedule</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-t hover:bg-muted/20">
                    <td className="py-3 px-4 font-medium">{student.fullName}</td>
                    <td className="py-3 px-4">
                      <div>{student.email}</div>
                      <div className="text-sm text-muted-foreground">{student.phone}</div>
                    </td>
                    <td className="py-3 px-4">{formatDate(student.createdAt)}</td>
                    <td className="py-3 px-4">
                      <div>{student.schedule || "Default Schedule"}</div>
                      <div className="text-sm text-muted-foreground">
                        Start: {student.startDate || batch?.details?.schedule?.startDate || "N/A"}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

