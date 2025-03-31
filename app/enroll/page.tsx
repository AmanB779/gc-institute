"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { AlertCircle, Upload, FileText } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import { batches } from "@/db/data/batches";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function EnrollmentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    parentName: "",
    parentPhone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    currentSchool: "",
    currentClass: "",
    interestedBatch: "",
    howDidYouHear: "",
    message: "",
    agreeToTerms: false,
  });
  const [documents, setDocuments] = useState<File[]>([]);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }));
    // Clear error when field is edited
    if (errors.agreeToTerms) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.agreeToTerms;
        return newErrors;
      });
    }
  };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePhoto(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setProfilePhotoPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setDocuments((prev) => [...prev, ...newFiles]);
    }
  };

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const validateStep = (stepNumber: number) => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "Phone number must be 10 digits";
      }
      if (!formData.parentName.trim()) newErrors.parentName = "Parent name is required";
      if (!formData.parentPhone.trim()) {
        newErrors.parentPhone = "Parent phone is required";
      } else if (!/^\d{10}$/.test(formData.parentPhone)) {
        newErrors.parentPhone = "Phone number must be 10 digits";
      }
    }

    if (stepNumber === 2) {
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.state.trim()) newErrors.state = "State is required";
      if (!formData.pincode.trim()) {
        newErrors.pincode = "Pincode is required";
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = "Pincode must be 6 digits";
      }
      if (!formData.currentSchool.trim()) newErrors.currentSchool = "Current school is required";
      if (!formData.currentClass.trim()) newErrors.currentClass = "Current class is required";
    }

    if (stepNumber === 3) {
      if (!formData.interestedBatch) newErrors.interestedBatch = "Please select a batch";
      if (!formData.howDidYouHear) newErrors.howDidYouHear = "Please select an option";
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(step)) return;

    setLoading(true);

    try {
      // Upload profile photo if exists
      let profilePhotoURL = null;
      if (profilePhoto) {
        const storageRef = ref(storage, `profile-photos/${Date.now()}_${profilePhoto.name}`);
        await uploadBytes(storageRef, profilePhoto);
        profilePhotoURL = await getDownloadURL(storageRef);
      }

      // Upload documents if any
      const documentURLs = [];
      for (const doc of documents) {
        const storageRef = ref(storage, `documents/${Date.now()}_${doc.name}`);
        await uploadBytes(storageRef, doc);
        const url = await getDownloadURL(storageRef);
        documentURLs.push({
          name: doc.name,
          url: url,
          type: doc.type,
          size: doc.size,
        });
      }

      // Add to Firestore
      await addDoc(collection(db, "enrollments"), {
        ...formData,
        profilePhoto: profilePhotoURL,
        documents: documentURLs,
        createdAt: serverTimestamp(),
        status: "pending",
        assignedBatch: null,
        schedule: null,
        startDate: null,
        notes: null,
      });

      toast({
        title: "Enrollment Submitted!",
        description: "We've received your enrollment request. Our team will contact you shortly.",
        variant: "default",
      });

      // Redirect to success page
      setTimeout(() => {
        router.push("/enroll/success");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your enrollment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection
          title="Enroll Now"
          description="Join Excel Academy and start your journey towards academic excellence"
          image="/hero-slide-1.jpg?height=400&width=1200"
        />

        <section className="py-12 container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((stepNumber) => (
                  <motion.div
                    key={stepNumber}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: stepNumber * 0.1 }}
                  >
                    <div
                      className={`h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold mb-2 transition-all duration-300 ${
                        step === stepNumber ? "bg-primary text-white" : step > stepNumber ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {stepNumber}
                    </div>
                    <span className={`text-sm font-medium ${step === stepNumber ? "text-primary" : "text-muted-foreground"}`}>
                      {stepNumber === 1 ? "Personal Info" : stepNumber === 2 ? "Address & Education" : "Course Selection"}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: `${((step - 1) / 2) * 100}%` }}
                  animate={{ width: `${((step - 1) / 2) * 100}%` }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </div>
            </div>

            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <form onSubmit={handleSubmit} className="space-y-8 bg-background p-8 rounded-xl shadow-sm border border-border/40">
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Personal Information</h2>
                    <p className="text-muted-foreground">Please provide your personal details for enrollment</p>

                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="space-y-2 w-full md:w-3/4">
                          <Label htmlFor="fullName">
                            Full Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={errors.fullName ? "border-red-500" : ""}
                          />
                          {errors.fullName && (
                            <p className="text-red-500 text-sm flex items-center mt-1">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.fullName}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2 w-full md:w-1/4">
                          <Label>Profile Photo</Label>
                          <div className="flex flex-col items-center">
                            <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-primary/20 mb-2">
                              {profilePhotoPreview ? (
                                <Image src={profilePhotoPreview || "/placeholder.svg"} alt="Profile Preview" fill className="object-cover" />
                              ) : (
                                <div className="h-full w-full bg-muted flex items-center justify-center">
                                  <FileText className="h-8 w-8 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <Label htmlFor="profilePhoto" className="cursor-pointer text-xs text-primary hover:underline">
                              Upload Photo
                            </Label>
                            <Input id="profilePhoto" type="file" accept="image/*" className="hidden" onChange={handleProfilePhotoChange} />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email Address <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? "border-red-500" : ""}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm flex items-center mt-1">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">
                            Phone Number <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            className={errors.phone ? "border-red-500" : ""}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm flex items-center mt-1">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="parentName">
                            Parent/Guardian Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="parentName"
                            name="parentName"
                            placeholder="Enter parent/guardian name"
                            value={formData.parentName}
                            onChange={handleChange}
                            className={errors.parentName ? "border-red-500" : ""}
                          />
                          {errors.parentName && (
                            <p className="text-red-500 text-sm flex items-center mt-1">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.parentName}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="parentPhone">
                            Parent/Guardian Phone <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="parentPhone"
                            name="parentPhone"
                            placeholder="Enter parent/guardian phone"
                            value={formData.parentPhone}
                            onChange={handleChange}
                            className={errors.parentPhone ? "border-red-500" : ""}
                          />
                          {errors.parentPhone && (
                            <p className="text-red-500 text-sm flex items-center mt-1">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.parentPhone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Address & Education</h2>
                    <p className="text-muted-foreground">Please provide your address and current education details</p>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">
                          Address <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="address"
                          name="address"
                          placeholder="Enter your address"
                          value={formData.address}
                          onChange={handleChange}
                          className={errors.address ? "border-red-500" : ""}
                        />
                        {errors.address && (
                          <p className="text-red-500 text-sm flex items-center mt-1">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.address}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">
                            City <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="city"
                            name="city"
                            placeholder="Enter your city"
                            value={formData.city}
                            onChange={handleChange}
                            className={errors.city ? "border-red-500" : ""}
                          />
                          {errors.city && (
                            <p className="text-red-500 text-sm flex items-center mt-1">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.city}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="state">
                            State <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="state"
                            name="state"
                            placeholder="Enter your state"
                            value={formData.state}
                            onChange={handleChange}
                            className={errors.state ? "border-red-500" : ""}
                          />
                          {errors.state && (
                            <p className="text-red-500 text-sm flex items-center mt-1">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.state}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pincode">
                            Pincode <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="pincode"
                            name="pincode"
                            placeholder="Enter your pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            className={errors.pincode ? "border-red-500" : ""}
                          />
                          {errors.pincode && (
                            <p className="text-red-500 text-sm flex items-center mt-1">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.pincode}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentSchool">
                            Current School/College <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="currentSchool"
                            name="currentSchool"
                            placeholder="Enter your current school/college"
                            value={formData.currentSchool}
                            onChange={handleChange}
                            className={errors.currentSchool ? "border-red-500" : ""}
                          />
                          {errors.currentSchool && (
                            <p className="text-red-500 text-sm flex items-center mt-1">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.currentSchool}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="currentClass">
                            Current Class/Year <span className="text-red-500">*</span>
                          </Label>
                          <Select value={formData.currentClass} onValueChange={(value) => handleSelectChange("currentClass", value)}>
                            <SelectTrigger id="currentClass" className={errors.currentClass ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select your current class/year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="8">Class 8</SelectItem>
                              <SelectItem value="9">Class 9</SelectItem>
                              <SelectItem value="10">Class 10</SelectItem>
                              <SelectItem value="11">Class 11</SelectItem>
                              <SelectItem value="12">Class 12</SelectItem>
                              <SelectItem value="12-pass">12th Pass</SelectItem>
                              <SelectItem value="drop">Drop Year</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.currentClass && (
                            <p className="text-red-500 text-sm flex items-center mt-1">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.currentClass}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Supporting Documents (Optional)</Label>
                        <Card className="border-dashed">
                          <CardContent className="p-4">
                            <div className="flex flex-col items-center justify-center py-4">
                              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground mb-1">Drag and drop files here or click to browse</p>
                              <p className="text-xs text-muted-foreground mb-4">Upload previous marksheets, certificates or any other relevant documents</p>
                              <Label
                                htmlFor="documents"
                                className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                              >
                                Browse Files
                              </Label>
                              <Input id="documents" type="file" multiple className="hidden" onChange={handleDocumentChange} />
                            </div>

                            {documents.length > 0 && (
                              <div className="mt-4 space-y-2">
                                <p className="text-sm font-medium">Uploaded Documents:</p>
                                {documents.map((doc, index) => (
                                  <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                                    <div className="flex items-center">
                                      <FileText className="h-4 w-4 mr-2 text-primary" />
                                      <span className="text-sm truncate max-w-[200px]">{doc.name}</span>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-500" onClick={() => removeDocument(index)}>
                                      ×
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Course Selection</h2>
                    <p className="text-muted-foreground">Please select the course you're interested in</p>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="interestedBatch">
                          Interested Batch <span className="text-red-500">*</span>
                        </Label>
                        <Select value={formData.interestedBatch} onValueChange={(value) => handleSelectChange("interestedBatch", value)}>
                          <SelectTrigger id="interestedBatch" className={errors.interestedBatch ? "border-red-500" : ""}>
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
                        {errors.interestedBatch && (
                          <p className="text-red-500 text-sm flex items-center mt-1">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.interestedBatch}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="howDidYouHear">
                          How did you hear about us? <span className="text-red-500">*</span>
                        </Label>
                        <RadioGroup
                          value={formData.howDidYouHear}
                          onValueChange={(value) => handleSelectChange("howDidYouHear", value)}
                          className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="social-media" id="social-media" />
                            <Label htmlFor="social-media">Social Media</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="friends-family" id="friends-family" />
                            <Label htmlFor="friends-family">Friends/Family</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="newspaper" id="newspaper" />
                            <Label htmlFor="newspaper">Newspaper</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="online-search" id="online-search" />
                            <Label htmlFor="online-search">Online Search</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="school" id="school" />
                            <Label htmlFor="school">School/College</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </RadioGroup>
                        {errors.howDidYouHear && (
                          <p className="text-red-500 text-sm flex items-center mt-1">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.howDidYouHear}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Additional Message (Optional)</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Any specific requirements or questions?"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                        />
                      </div>

                      <div className="pt-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={handleCheckboxChange}
                            className={errors.agreeToTerms ? "border-red-500" : ""}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="agreeToTerms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              I agree to the{" "}
                              <Link href="/terms" className="text-primary hover:underline">
                                Terms & Conditions
                              </Link>{" "}
                              and{" "}
                              <Link href="/privacy" className="text-primary hover:underline">
                                Privacy Policy
                              </Link>
                            </Label>
                            {errors.agreeToTerms && (
                              <p className="text-red-500 text-sm flex items-center mt-1">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.agreeToTerms}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  {step > 1 ? (
                    <Button type="button" variant="outline" onClick={prevStep} className="rounded-full">
                      Previous
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  {step < 3 ? (
                    <Button type="button" onClick={nextStep} className="rounded-full bg-gradient-to-r from-primary to-secondary">
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" className="rounded-full bg-gradient-to-r from-primary to-secondary" disabled={loading}>
                      {loading ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        "Submit Enrollment"
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
