'use server';

import tasksCollection, { Task } from '../models/Task';
import { ObjectId } from 'mongodb';

export async function createTask(task: Omit<Task, '_id'>) {
  await tasksCollection.insertOne(task);
}

export async function getTasks() {
  return await tasksCollection.find().toArray();
}

export async function updateTask(id: string, task: Partial<Task>) {
  await tasksCollection.updateOne({ _id: new ObjectId(id) }, { $set: task });
}

export async function deleteTask(id: string) {
  await tasksCollection.deleteOne({ _id: new ObjectId(id) });
}