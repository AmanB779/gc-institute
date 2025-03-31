"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Trash2, Plus, Upload, Image } from "lucide-react"
import { batches } from "@/db/data/batches"
import { testimonials } from "@/db/data/testimonials"
import { faculty } from "@/db/data/faculty"
import { stats } from "@/db/data/stats"
import { features } from "@/db/data/features"
import { founder } from "@/db/data/founder"

export default function ContentEditor() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList>
        <TabsTrigger value="home">Home Page</TabsTrigger>
        <TabsTrigger value="about">About Us</TabsTrigger>
        <TabsTrigger value="courses">Courses</TabsTrigger>
        <TabsTrigger value="toppers">Toppers</TabsTrigger>
        <TabsTrigger value="faculty">Faculty</TabsTrigger>
        <TabsTrigger value="founder">Founder</TabsTrigger>
      </TabsList>

      {/* Home Page Content */}
      <TabsContent value="home" className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Hero Slider Content</Label>
            <div className="border rounded-lg p-4 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4 pb-4 border-b last:border-0">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Slide {i}</h4>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Title</Label>
                      <div className="font-medium">Achieve Academic Excellence</div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Description</Label>
                      <div>
                        Join Excel Academy for comprehensive coaching and guidance for JEE, NEET, and Foundation
                        courses.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative h-16 w-32 bg-muted rounded-md overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Change Image
                    </Button>
                  </div>
                </div>
              ))}
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add New Slide
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Statistics Section</Label>
            <div className="border rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="font-bold text-xl">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Featured Batches</Label>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Selected Batches</h4>
                <Button variant="outline" size="sm">
                  Change Selection
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {batches.slice(0, 3).map((batch) => (
                  <div key={batch.id} className="border rounded-md p-3">
                    <div className="font-medium">{batch.title}</div>
                    <div className="text-sm text-muted-foreground truncate">{batch.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Why Choose Us Section</Label>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Features</h4>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {features.slice(0, 3).map((feature) => (
                  <div key={feature.id} className="border rounded-md p-3">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{feature.title}</div>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">{feature.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </TabsContent>

      {/* About Us Content */}
      <TabsContent value="about" className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>About Us Content</Label>
            <div className="border rounded-lg p-4 space-y-4">
              <div className="space-y-2">
                <Label>Page Title</Label>
                <Input defaultValue="About Excel Academy" />
              </div>
              <div className="space-y-2">
                <Label>Page Description</Label>
                <Input defaultValue="Empowering students to achieve academic excellence since 2008" />
              </div>
              <div className="space-y-2">
                <Label>Our Story</Label>
                <Textarea
                  rows={5}
                  defaultValue="Excel Academy was founded in 2008 by a group of passionate educators with a vision to transform the coaching landscape by providing quality education that focuses on conceptual understanding rather than rote learning. What started as a small institute with just 30 students has now grown into one of the most trusted names in coaching with over 1,200 students enrolling each year and a track record of producing top rankers in various competitive exams."
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Mission & Vision</Label>
            <div className="border rounded-lg p-4 space-y-4">
              <div className="space-y-2">
                <Label>Our Mission</Label>
                <Textarea
                  rows={3}
                  defaultValue="To provide quality education that empowers students to excel academically and develop critical thinking skills that will serve them throughout their lives."
                />
              </div>
              <div className="space-y-2">
                <Label>Our Vision</Label>
                <Textarea
                  rows={3}
                  defaultValue="To be the leading educational institution that transforms students into future leaders by providing them with the knowledge, skills, and values needed to succeed in a rapidly changing world."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </TabsContent>

      {/* Courses Content */}
      <TabsContent value="courses" className="space-y-4">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted/50 p-4 flex justify-between items-center">
            <h3 className="font-medium">All Courses</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Course
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Duration</th>
                  <th className="text-left py-3 px-4">Capacity</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((batch) => (
                  <tr key={batch.id} className="border-t hover:bg-muted/20">
                    <td className="py-3 px-4 font-medium">{batch.title}</td>
                    <td className="py-3 px-4 capitalize">{batch.category}</td>
                    <td className="py-3 px-4">{batch.duration}</td>
                    <td className="py-3 px-4">{batch.students} students</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TabsContent>

      {/* Toppers Content */}
      <TabsContent value="toppers" className="space-y-4">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted/50 p-4 flex justify-between items-center">
            <h3 className="font-medium">Toppers & Testimonials</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Topper
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Rank</th>
                  <th className="text-left py-3 px-4">Year</th>
                  <th className="text-left py-3 px-4">College</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="border-t hover:bg-muted/20">
                    <td className="py-3 px-4 font-medium">{testimonial.name}</td>
                    <td className="py-3 px-4">{testimonial.rank}</td>
                    <td className="py-3 px-4">{testimonial.year}</td>
                    <td className="py-3 px-4">{testimonial.college}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TabsContent>

      {/* Faculty Content */}
      <TabsContent value="faculty" className="space-y-4">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted/50 p-4 flex justify-between items-center">
            <h3 className="font-medium">Faculty Members</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Faculty
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Position</th>
                  <th className="text-left py-3 px-4">Experience</th>
                  <th className="text-left py-3 px-4">Education</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {faculty.map((member) => (
                  <tr key={member.id} className="border-t hover:bg-muted/20">
                    <td className="py-3 px-4 font-medium">{member.name}</td>
                    <td className="py-3 px-4">{member.position}</td>
                    <td className="py-3 px-4">{member.experience}</td>
                    <td className="py-3 px-4">{member.education}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TabsContent>

      {/* Founder Content */}
      <TabsContent value="founder" className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Founder Information</Label>
            <div className="border rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input defaultValue={founder.name} />
                </div>
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Input defaultValue={founder.position} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Profile Image</Label>
                <div className="flex items-center space-x-4">
                  <div className="relative h-24 w-24 bg-muted rounded-md overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Image
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Education</Label>
                <div className="space-y-2">
                  {founder.education.map((edu, index) => (
                    <div key={index} className="flex items-center">
                      <Input defaultValue={edu} className="flex-1" />
                      <Button variant="ghost" size="icon" className="ml-2 text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Education
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Experience</Label>
                <Input defaultValue={founder.experience} />
              </div>

              <div className="space-y-2">
                <Label>Journey</Label>
                <Textarea rows={6} defaultValue={founder.journey} />
              </div>

              <div className="space-y-2">
                <Label>Vision</Label>
                <Textarea rows={3} defaultValue={founder.vision} />
              </div>

              <div className="space-y-2">
                <Label>Mission</Label>
                <Textarea rows={3} defaultValue={founder.mission} />
              </div>

              <div className="space-y-2">
                <Label>Achievements</Label>
                <div className="space-y-2">
                  {founder.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center">
                      <Input defaultValue={achievement} className="flex-1" />
                      <Button variant="ghost" size="icon" className="ml-2 text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Achievement
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Social Media</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">LinkedIn</Label>
                    <Input defaultValue={founder.socialMedia.linkedin} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Twitter</Label>
                    <Input defaultValue={founder.socialMedia.twitter} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Facebook</Label>
                    <Input defaultValue={founder.socialMedia.facebook} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

