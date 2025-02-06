import express from 'express';
import cors from 'cors';
import firebaseAdmin from 'firebase-admin';
import firebaseServiceAccountKey from './config.js'; // Importing configuration

// Initialize Firebase Admin SDK with the service account credentials from config.js
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseServiceAccountKey)
});

// Initialize Firestore
const db = firebaseAdmin.firestore();

// Initialize Express App
const app = express();
app.use(cors());
app.use(express.json());

// API Endpoint to get feature vectors from Firestore
app.get('/getFeatureVectors', async (req, res) => {
  try {
    // Get all documents in the 'image_features' collection
    const snapshot = await db.collection('image_features').get();
    if (snapshot.empty) {
      return res.status(404).json({ message: 'No documents found' });
    }

    // Format the data from Firestore
    const featureVectors = snapshot.docs.map(doc => ({
      id: doc.id,
      features: doc.data().features //'features' field
    }));

    // Sending the feature vectors as a response
    return res.status(200).json({ featureVectors });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving feature vectors', error });
  }
});

// API Endpoint to add a feature vector to Firestore 
app.post('/addFeatureVector', async (req, res) => {
  const { imageId, features } = req.body;
  
  if (!imageId || !features) {
    return res.status(400).json({ message: 'imageId and features are required' });
  }

  try {
    // Store the feature vector in the Firestore 'image_features' collection
    const docRef = db.collection('image_features').doc(imageId);
    await docRef.set({ features });

    return res.status(200).json({ message: 'Feature vector added successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error adding feature vector', error });
  }
});

// Starting epress server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
