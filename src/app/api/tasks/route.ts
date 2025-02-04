// app/api/tasks/route.ts
import { NextResponse } from 'next/server';
import tasksCollection from '../../../../models/Task';
import { ObjectId } from 'mongodb';

// GET: Fetch all tasks
export async function GET() {
  try {
    const tasks = await tasksCollection.find().toArray();
    return NextResponse.json(tasks.map((task) => ({
      ...task,
      _id: task._id.toString(),
    })));
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST: Create a new task
export async function POST(request: Request) {
  try {
    const { title, description, dueDate } = await request.json();
    const newTask = { title, description, dueDate, isCompleted: false };
    await tasksCollection.insertOne(newTask);
    return NextResponse.json(newTask, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}

// PUT: Update a task (e.g., toggle completion)
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const { isCompleted } = await request.json();
    await tasksCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { isCompleted } }
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a task
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await tasksCollection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}