"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const contentTypes = [
  { id: "batches", label: "Batches" },
  { id: "faculty", label: "Faculty" },
  { id: "features", label: "Features" },
  { id: "founder", label: "Founder" },
  { id: "notes", label: "Notes" },
  { id: "stats", label: "Stats" },
  { id: "testimonials", label: "Testimonials" },
];

export function ContentManager() {
  const [activeType, setActiveType] = useState("batches");
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, [activeType]);

  const loadContent = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/content?type=${activeType}`);
      if (!response.ok) throw new Error("Failed to load content");
      const data = await response.json();
      setContent(data);
    } catch (error) {
      toast.error("Failed to load content");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch(`/api/admin/content?type=${activeType}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (!response.ok) throw new Error("Failed to save content");
      toast.success("Content saved successfully");
    } catch (error) {
      toast.error("Failed to save content");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderEditor = () => {
    if (isLoading) return <div>Loading...</div>;

    switch (activeType) {
      case "batches":
        return (
          <div className="space-y-4">
            {content.map((batch: any, index: number) => (
              <Card key={index} className="p-4">
                <div className="space-y-2">
                  <Input
                    value={batch.title}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[index].title = e.target.value;
                      setContent(newContent);
                    }}
                    placeholder="Batch Title"
                  />
                  <Textarea
                    value={batch.description}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[index].description = e.target.value;
                      setContent(newContent);
                    }}
                    placeholder="Description"
                  />
                  <Input
                    value={batch.duration}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[index].duration = e.target.value;
                      setContent(newContent);
                    }}
                    placeholder="Duration"
                  />
                  <Input
                    value={batch.students}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[index].students = e.target.value;
                      setContent(newContent);
                    }}
                    placeholder="Number of Students"
                  />
                </div>
              </Card>
            ))}
            <Button
              onClick={() => {
                setContent([
                  ...content,
                  {
                    id: `batch-${content.length + 1}`,
                    title: "",
                    description: "",
                    duration: "",
                    students: "",
                  },
                ]);
              }}
            >
              Add Batch
            </Button>
          </div>
        );

      case "faculty":
        return (
          <div className="space-y-4">
            {content.map((member: any, index: number) => (
              <Card key={index} className="p-4">
                <div className="space-y-2">
                  <Input
                    value={member.name}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[index].name = e.target.value;
                      setContent(newContent);
                    }}
                    placeholder="Name"
                  />
                  <Input
                    value={member.position}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[index].position = e.target.value;
                      setContent(newContent);
                    }}
                    placeholder="Position"
                  />
                  <Textarea
                    value={member.bio}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[index].bio = e.target.value;
                      setContent(newContent);
                    }}
                    placeholder="Bio"
                  />
                </div>
              </Card>
            ))}
            <Button
              onClick={() => {
                setContent([
                  ...content,
                  {
                    id: `faculty-${content.length + 1}`,
                    name: "",
                    position: "",
                    bio: "",
                  },
                ]);
              }}
            >
              Add Faculty Member
            </Button>
          </div>
        );

      case "features":
        return (
          <div className="space-y-4">
            {content.map((feature: any, index: number) => (
              <Card key={index} className="p-4">
                <div className="space-y-2">
                  <Input
                    value={feature.title}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[index].title = e.target.value;
                      setContent(newContent);
                    }}
                    placeholder="Feature Title"
                  />
                  <Textarea
                    value={feature.description}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[index].description = e.target.value;
                      setContent(newContent);
                    }}
                    placeholder="Description"
                  />
                </div>
              </Card>
            ))}
            <Button
              onClick={() => {
                setContent([
                  ...content,
                  {
                    id: `feature-${content.length + 1}`,
                    title: "",
                    description: "",
                  },
                ]);
              }}
            >
              Add Feature
            </Button>
          </div>
        );

      case "founder":
        return (
          <Card className="p-4">
            <div className="space-y-4">
              <Input
                value={content.name}
                onChange={(e) => {
                  setContent({ ...content, name: e.target.value });
                }}
                placeholder="Name"
              />
              <Input
                value={content.position}
                onChange={(e) => {
                  setContent({ ...content, position: e.target.value });
                }}
                placeholder="Position"
              />
              <Textarea
                value={content.bio}
                onChange={(e) => {
                  setContent({ ...content, bio: e.target.value });
                }}
                placeholder="Bio"
              />
              <Textarea
                value={content.vision}
                onChange={(e) => {
                  setContent({ ...content, vision: e.target.value });
                }}
                placeholder="Vision"
              />
              <Textarea
                value={content.mission}
                onChange={(e) => {
                  setContent({ ...content, mission: e.target.value });
                }}
                placeholder="Mission"
              />
            </div>
          </Card>
        );

      case "notes":
        return (
          <div className="space-y-4">
            {content.map((note: any, index: number) => (
              <Card key={index} className="p-4">
                <div className="space-y-2">
                  <Input
                    value={note.title}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[index].title = e.target.value;
                      setContent(newContent);
                    }}
                    placeholder="Note Title"
                  />
                  <Textarea
                    value={note.description}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[index].description = e.target.value;
                      setContent(newContent);
                    }}
                    placeholder="Description"
                  />
                  <Input
                    value={note.pages}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[index].pages = e.target.value;
                      setContent(newContent);
                    }}
                    placeholder="Number of Pages"
                  />
                </div>
              </Card>
            ))}
            <Button
              onClick={() => {
                setContent([
                  ...content,
                  {
                    id: `note-${content.length + 1}`,
                    title: "",
                    description: "",
                    pages: "",
                  },
                ]);
              }}
            >
              Add Note
            </Button>
          </div>
        );

      case "stats":
        return (
          <div className="space-y-4">
            {content.map((stat: any, index: number) => (
              <Card key={index} className="p-4">
                <div className="space-y-2">
                  <Input
                    value={stat.value}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[index].value = e.target.value;
                      setContent(newContent);
                    }}
                    placeholder="Value"
                  />
                  <Input
                    value={stat.label}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[index].label = e.target.value;
                      setContent(newContent);
                    }}
                    placeholder="Label"
                  />
                </div>
              </Card>
            ))}
            <Button
              onClick={() => {
                setContent([
                  ...content,
                  {
                    id: `stat-${content.length + 1}`,
                    value: "",
                    label: "",
                  },
                ]);
              }}
            >
              Add Stat
            </Button>
          </div>
        );

      case "testimonials":
        return (
          <div className="space-y-4">
            {content.map((testimonial: any, index: number) => (
              <Card key={index} className="p-4">
                <div className="space-y-2">
                  <Input
                    value={testimonial.name}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[index].name = e.target.value;
                      setContent(newContent);
                    }}
                    placeholder="Student Name"
                  />
                  <Input
                    value={testimonial.rank}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[index].rank = e.target.value;
                      setContent(newContent);
                    }}
                    placeholder="Rank"
                  />
                  <Textarea
                    value={testimonial.text}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[index].text = e.target.value;
                      setContent(newContent);
                    }}
                    placeholder="Testimonial Text"
                  />
                </div>
              </Card>
            ))}
            <Button
              onClick={() => {
                setContent([
                  ...content,
                  {
                    id: `testimonial-${content.length + 1}`,
                    name: "",
                    rank: "",
                    text: "",
                  },
                ]);
              }}
            >
              Add Testimonial
            </Button>
          </div>
        );

      default:
        return <div>Select a content type</div>;
    }
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeType} onValueChange={setActiveType}>
        <TabsList>
          {contentTypes.map((type) => (
            <TabsTrigger key={type.id} value={type.id}>
              {type.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {contentTypes.map((type) => (
          <TabsContent key={type.id} value={type.id}>
            {renderEditor()}
            <div className="mt-4">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
