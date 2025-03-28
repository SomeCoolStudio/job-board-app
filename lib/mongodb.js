import { MongoClient, ObjectId } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = "devrankedjobs";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

// Create MongoClient instance
const client = new MongoClient(MONGODB_URI);

// Connect to the MongoDB client
let db;

async function connectToDatabase() {
  if (!db) {
    await client.connect(); // Ensure the connection happens only once
    db = client.db(DB_NAME);
  }
  return db;
}

// Export the function to get the database connection
export { connectToDatabase, ObjectId };
