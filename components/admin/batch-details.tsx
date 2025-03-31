"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Eye, Edit, Trash2, Upload, Download, FileText } from "lucide-react"
import { batches } from "@/db/data/batches"
import { collection, getDocs, query, where, doc, deleteDoc, addDoc, serverTimestamp } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { db, storage } from "@/lib/firebase"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"

interface BatchDetailsProps {
  batchId: string
}

export default function BatchDetails({ batchId }: BatchDetailsProps) {
  const [enrolledStudents, setEnrolledStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("students")
  const [questionPapers, setQuestionPapers] = useState<any[]>([])
  const [notes, setNotes] = useState<any[]>([])
  const [uploadingFile, setUploadingFile] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileTitle, setFileTitle] = useState("")
  const [fileDescription, setFileDescription] = useState("")
  const [fileType, setFileType] = useState<"question-paper" | "note">("question-paper")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  useEffect(() => {
    if (batchId) {
      fetchEnrolledStudents(batchId)
      fetchBatchFiles(batchId)
    }
  }, [batchId])

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
      toast({
        title: "Error",
        description: "Failed to fetch enrolled students",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchBatchFiles = async (batchId: string) => {
    try {
      // Fetch question papers
      const questionPapersQuery = query(
        collection(db, "batch-files"),
        where("batchId", "==", batchId),
        where("type", "==", "question-paper"),
      )

      const questionPapersSnapshot = await getDocs(questionPapersQuery)
      const questionPapersData = questionPapersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setQuestionPapers(questionPapersData)

      // Fetch notes
      const notesQuery = query(
        collection(db, "batch-files"),
        where("batchId", "==", batchId),
        where("type", "==", "note"),
      )

      const notesSnapshot = await getDocs(notesQuery)
      const notesData = notesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setNotes(notesData)
    } catch (error) {
      console.error("Error fetching batch files:", error)
      toast({
        title: "Error",
        description: "Failed to fetch batch files",
        variant: "destructive",
      })
    }
  }

  const handleFileUpload = async () => {
    if (!selectedFile || !fileTitle) {
      toast({
        title: "Missing Information",
        description: "Please provide a file and title",
        variant: "destructive",
      })
      return
    }

    setUploadingFile(true)

    try {
      // Upload file to storage
      const storageRef = ref(storage, `batch-files/${batchId}/${Date.now()}_${selectedFile.name}`)
      await uploadBytes(storageRef, selectedFile)
      const fileUrl = await getDownloadURL(storageRef)

      // Add file metadata to Firestore
      await addDoc(collection(db, "batch-files"), {
        batchId,
        title: fileTitle,
        description: fileDescription,
        fileName: selectedFile.name,
        fileUrl,
        fileSize: selectedFile.size,
        fileType: selectedFile.type,
        type: fileType,
        uploadedAt: serverTimestamp(),
      })

      toast({
        title: "File Uploaded",
        description: "The file has been uploaded successfully",
      })

      // Refresh files list
      fetchBatchFiles(batchId)

      // Reset form
      setSelectedFile(null)
      setFileTitle("")
      setFileDescription("")
      setIsUploadDialogOpen(false)
    } catch (error) {
      console.error("Error uploading file:", error)
      toast({
        title: "Upload Error",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploadingFile(false)
    }
  }

  const handleFileDelete = async (fileId: string, fileUrl: string) => {
    if (confirm("Are you sure you want to delete this file?")) {
      try {
        // Delete from Firestore
        await deleteDoc(doc(db, "batch-files", fileId))

        // Delete from Storage
        const storageRef = ref(storage, fileUrl)
        await deleteObject(storageRef)

        toast({
          title: "File Deleted",
          description: "The file has been deleted successfully",
        })

        // Refresh files list
        fetchBatchFiles(batchId)
      } catch (error) {
        console.error("Error deleting file:", error)
        toast({
          title: "Delete Error",
          description: "Failed to delete file. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const getSelectedBatch = () => {
    return batches.find((batch) => batch.id === batchId)
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

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const getInitials = (name: string) => {
    if (!name) return "ST"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="question-papers">Question Papers</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold">{batch?.title}</h2>
              <p className="text-muted-foreground">
                {enrolledStudents.length} students enrolled • {batch?.duration}
              </p>
            </div>

            <div className="flex items-center space-x-2 w-full md:w-auto">
              <Input
                placeholder="Search students..."
                className="w-full md:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No students enrolled in this batch</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left py-3 px-4">Student</th>
                      <th className="text-left py-3 px-4">Contact</th>
                      <th className="text-left py-3 px-4">Enrollment Date</th>
                      <th className="text-left py-3 px-4">Schedule</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredStudents.map((student, index) => (
                        <motion.tr
                          key={student.id}
                          className="border-t hover:bg-muted/20"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={student.profilePhoto || ""} alt={student.fullName} />
                                <AvatarFallback>{getInitials(student.fullName)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.fullName}</div>
                                <div className="text-xs text-muted-foreground">Class {student.currentClass}</div>
                              </div>
                            </div>
                          </td>
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
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="question-papers" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Question Papers</h2>
            <Button
              onClick={() => {
                setFileType("question-paper")
                setIsUploadDialogOpen(true)
              }}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Question Paper
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {questionPapers.length === 0 ? (
              <div className="col-span-full text-center py-8 border rounded-lg">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No question papers available</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setFileType("question-paper")
                    setIsUploadDialogOpen(true)
                  }}
                >
                  Upload Question Paper
                </Button>
              </div>
            ) : (
              questionPapers.map((paper, index) => (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{paper.title}</CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => handleFileDelete(paper.id, paper.fileUrl)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription>{formatDate(paper.uploadedAt?.toDate())}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {paper.description && <p className="text-sm text-muted-foreground mb-4">{paper.description}</p>}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <FileText className="h-4 w-4 mr-1" />
                          <span>{formatFileSize(paper.fileSize)}</span>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={paper.fileUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Study Notes</h2>
            <Button
              onClick={() => {
                setFileType("note")
                setIsUploadDialogOpen(true)
              }}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Notes
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.length === 0 ? (
              <div className="col-span-full text-center py-8 border rounded-lg">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No study notes available</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setFileType("note")
                    setIsUploadDialogOpen(true)
                  }}
                >
                  Upload Notes
                </Button>
              </div>
            ) : (
              notes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{note.title}</CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => handleFileDelete(note.id, note.fileUrl)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription>{formatDate(note.uploadedAt?.toDate())}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {note.description && <p className="text-sm text-muted-foreground mb-4">{note.description}</p>}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <FileText className="h-4 w-4 mr-1" />
                          <span>{formatFileSize(note.fileSize)}</span>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={note.fileUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* File Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload {fileType === "question-paper" ? "Question Paper" : "Study Notes"}</DialogTitle>
            <DialogDescription>
              Upload {fileType === "question-paper" ? "question papers" : "study notes"} for students in this batch.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fileTitle">Title</Label>
              <Input
                id="fileTitle"
                placeholder="Enter file title"
                value={fileTitle}
                onChange={(e) => setFileTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fileDescription">Description (Optional)</Label>
              <Textarea
                id="fileDescription"
                placeholder="Enter file description"
                value={fileDescription}
                onChange={(e) => setFileDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">File</Label>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                {selectedFile ? (
                  <div className="text-center">
                    <FileText className="h-8 w-8 mx-auto text-primary mb-2" />
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-red-500"
                      onClick={() => setSelectedFile(null)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Drag and drop file here or click to browse</p>
                    <Label
                      htmlFor="fileUpload"
                      className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Browse Files
                    </Label>
                  </>
                )}
                <Input
                  id="fileUpload"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0])
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleFileUpload} disabled={uploadingFile || !selectedFile}>
              {uploadingFile ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

