// pages/api/comments.js
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();

    const collection = db.collection('comments'); // The comments collection in the sample_mflix database
    const data = await collection.find({}).toArray(); // Fetch all records from the comments collection

    // Return the data as a JSON response
    res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error connecting to database' });
  }
}