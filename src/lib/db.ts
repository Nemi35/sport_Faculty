import { MongoClient, Db } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  // If cached connection exists, return it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Ensure MONGODB_URI is defined
  if (!process.env.MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env.local');
  }

  try {
    // Establish a new MongoDB connection
    const client = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db('sample_mflix');

    // Cache the client and db for reuse
    cachedClient = client;
    cachedDb = db;

    console.log("MongoDB connected successfully");

    return { client, db };
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error('Failed to connect to MongoDB');
  }
}
