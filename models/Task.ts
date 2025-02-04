import { MongoClient, Collection, ObjectId } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
await client.connect();
const db = client.db('taskmanager');
const tasksCollection: Collection = db.collection('tasks');

export interface Task {
  _id?: ObjectId; // Use ObjectId instead of string
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
}

export default tasksCollection;