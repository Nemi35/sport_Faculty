import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // If cached connection exists, return it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Ensure MONGODB_URI is defined
  if (!process.env.MONGO_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  // Establish a new MongoDB connection
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('sample_mflix');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}