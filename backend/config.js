import fs from 'fs';
import path from 'path'
// Firebase configuration for Admin SDK (service account credentials)
const firebaseServiceAccountKey = JSON.parse(fs.readFileSync(path.resolve('firebaseServiceAccountKey.json'), 'utf8'));

// Firebase Firestore Configuration 
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Export configurations
export default firebaseServiceAccountKey;

