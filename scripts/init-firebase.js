const { initializeApp } = require("firebase/app");
const { getFirestore, collection, doc, setDoc } = require("firebase/firestore");
const { getStorage } = require("firebase/storage");
const { batches } = require("../db/data/batches");
const { faculty } = require("../db/data/faculty");
const { features } = require("../db/data/features");
const { founder } = require("../db/data/founder");
const { notes } = require("../db/data/notes");
const { stats } = require("../db/data/stats");
const { testimonials } = require("../db/data/testimonials");
require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

async function initializeFirebase() {
  try {
    // Initialize collections
    const collections = {
      batches,
      faculty,
      features,
      founder,
      notes,
      stats,
      testimonials,
    };

    // Add data to Firestore
    for (const [collectionName, data] of Object.entries(collections)) {
      const collectionRef = collection(db, collectionName);

      if (Array.isArray(data)) {
        // For array data, add each item as a document
        for (const item of data) {
          await setDoc(doc(collectionRef, item.id), item);
        }
      } else {
        // For single object data, add as a single document
        await setDoc(doc(collectionRef, "data"), data);
      }
    }

    console.log("Firebase initialization completed successfully!");
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
}

// Run the initialization
initializeFirebase();
