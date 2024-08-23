import { Db, MongoClient } from 'mongodb';
import { CollectionName } from './types';

let db: Db | null = null;

export const connectToDatabase = async (connectionString: string, databaseName: string) => {
  try {
    const client = new MongoClient(connectionString);
    await client.connect();
    if (db === null) {
      db = client.db(databaseName);
    }
    console.info('Connected to database');
  } catch (err) {
    console.error(`Error connecting to database - ${err}`);
  }
};

export const insertDocuments = async (collectionName: CollectionName, documents: any[]) => {
  if (!db) {
    throw new Error('Database is not connected');
  }

  try {
    const collection = db.collection(collectionName);
    await collection.insertMany(documents);

    console.info(`Inserted ${documents.length} documents into collection ${collectionName}`);
  } catch (err) {
    console.error(`Error inserting documents into collection ${collectionName} - ${err}`);
  }
};

export const cleanDatabase = async () => {
  if (!db) {
    throw new Error('Database is not connected');
  }

  try {
    await db.dropDatabase();
    console.info('Database cleaned successfully');
  } catch (err) {
    console.error(`Error cleaning the database - ${err}`);
  }
};
