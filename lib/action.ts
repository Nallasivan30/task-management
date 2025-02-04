'use server';

import tasksCollection, { Task } from '../models/Task';

export async function createTask(task: Task) {
  await tasksCollection.insertOne(task);
}

export async function getTasks() {
  return await tasksCollection.find().toArray();
}

export async function updateTask(id: string, task: Partial<Task>) {
  await tasksCollection.updateOne({ _id: id }, { $set: task });
}

export async function deleteTask(id: string) {
  await tasksCollection.deleteOne({ _id: id });
}