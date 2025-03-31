import { db, storage } from "../firebase";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export class DataService {
  // Generic CRUD operations
  static async getCollection(collectionName: string) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  static async getDocument(collectionName: string, docId: string) {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  }

  static async setDocument(collectionName: string, docId: string, data: any) {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data);
  }

  static async updateDocument(collectionName: string, docId: string, data: any) {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
  }

  static async deleteDocument(collectionName: string, docId: string) {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  }

  // File upload operations
  static async uploadFile(file: File, path: string): Promise<string> {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  static async deleteFile(path: string) {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  }

  // Specific collection operations
  static async getBatches() {
    return this.getCollection("batches");
  }

  static async getFaculty() {
    return this.getCollection("faculty");
  }

  static async getFeatures() {
    return this.getCollection("features");
  }

  static async getFounder() {
    return this.getDocument("founder", "data");
  }

  static async getNotes() {
    return this.getCollection("notes");
  }

  static async getStats() {
    return this.getCollection("stats");
  }

  static async getTestimonials() {
    return this.getCollection("testimonials");
  }

  // Update specific collections
  static async updateBatch(batchId: string, data: any) {
    await this.updateDocument("batches", batchId, data);
  }

  static async updateFaculty(facultyId: string, data: any) {
    await this.updateDocument("faculty", facultyId, data);
  }

  static async updateFeature(featureId: string, data: any) {
    await this.updateDocument("features", featureId, data);
  }

  static async updateFounder(data: any) {
    await this.setDocument("founder", "data", data);
  }

  static async updateNote(noteId: string, data: any) {
    await this.updateDocument("notes", noteId, data);
  }

  static async updateStat(statId: string, data: any) {
    await this.updateDocument("stats", statId, data);
  }

  static async updateTestimonial(testimonialId: string, data: any) {
    await this.updateDocument("testimonials", testimonialId, data);
  }
}
